import { Static, Type as t } from "@sinclair/typebox";
import { SQL, asc, desc, getTableName, sql } from "drizzle-orm";
import { toSnakeCase } from "drizzle-orm/casing";
import { AnyPgColumn, PgColumn } from "drizzle-orm/pg-core";

import { NotImplementedError } from "@errors/not-implemented.js";
import { UnknownError } from "@errors/unknown.js";

import { logger } from "./logger.js";
import { lower } from "./sql.js";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const PaginationFilterSchema = t.Object({
  offset: t.Optional(
    t.Number({
      description: "default value is `0`.\n\nnumber of rows to skip.",
      minimum: 0,
    }),
  ),
  limit: t.Optional(
    t.Number({
      description: "default value is `10`.\n\nnumber of rows to return.",
      minimum: 1,
    }),
  ),
  sortBy: t.Optional(
    t.String({
      description:
        "fields to sort. delimit multiple fields by comma. default value is `updatedAt`.",
    }),
  ),
  sortOrder: t.Optional(
    t.String({
      description:
        "accepts either only `asc` or `desc`. delimit multiple values by comma. default value is `desc`.",
      pattern: "^(asc|desc)(,(asc|desc))*$",
    }),
  ),
});

export type PaginationFilterType = Static<typeof PaginationFilterSchema>;

export function queryOrderBy(
  paginationSortBy?: string,
  paginationSortOrder?: string,
  columnMapping?: Record<string, PgColumn>,
  defaultSortCol: string = "updatedAt",
) {
  const columns = paginationSortBy
    ? paginationSortBy.split(",")
    : [defaultSortCol];

  const sortOrder = paginationSortOrder
    ? paginationSortOrder.split(",")
    : [SortOrder.DESC];

  const lengthDiff = columns.length - sortOrder.length;

  if (lengthDiff > 0) {
    sortOrder.push(...Array(lengthDiff).fill(SortOrder.DESC));
  }

  const colsToSort = columnsToSort(columns, columnMapping);

  const orderBy = colsToSort.map((col, i) => {
    const order = sortOrder[i];

    switch (order) {
      case SortOrder.ASC: {
        return asc(col);
      }
      default: {
        return desc(col);
      }
    }
  });

  return sql.join(orderBy, sql`, `);
}

function columnsToSort(
  sortBy: string[],
  columnMapping?: Record<string, PgColumn>,
): SQL[] {
  if (columnMapping) {
    return sortBy.map((x) => getSortSQL(x, columnMapping));
  } else {
    return sortBy.map((x) => sql`${sql.identifier(toSnakeCase(x))}`);
  }
}

function getSortSQL(
  colName: string,
  columnMapping: Record<string, PgColumn>,
): SQL {
  try {
    const column = columnMapping[colName];
    const tableName = getTableName(column.table);
    const snakeCaseColName = toSnakeCase(column.name);
    return sql`${sql.identifier(tableName)}.${sql.identifier(snakeCaseColName)}`;
  } catch (e) {
    if (e instanceof TypeError)
      throw new NotImplementedError(`no sorting implemented for - ${colName}.`);
    else {
      logger.error(e);
      throw new UnknownError();
    }
  }
}

/**
 * Generates a weighted full-text search condition for PostgreSQL using `tsvector` and `to_tsquery()`.
 *
 * Higher weights are assigned to earlier columns for better relevance.
 *
 * @param columns - Database columns to be searched.
 * @param searchText - The text to search for. Returns `TRUE` if empty.
 * @returns SQL condition for full-text search.
 */
export function generateTextSearchCondition(
  columns: AnyPgColumn[],
  searchText?: string,
) {
  if (!searchText) return sql`TRUE`;

  const weightLevels = ["A", "B", "C", "D"];

  const formattedText = searchText
    .trim()
    .toLowerCase()
    .replace(/[()&|!<>]/g, " ")
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => `${word}:*`)
    .join(" & ");

  const vectorSearch = columns
    .map((column, index) => {
      const weight = weightLevels[index] || "D";

      return sql`
        setweight(to_tsvector('simple', COALESCE(${lower(column)}, ${lower(columns[0])})), ${sql.raw(`'${weight}'`)})
      `;
    })
    .reduce((acc, curr) => sql`${acc} || ${curr}`);

  return sql`(${vectorSearch} @@ to_tsquery('simple', ${formattedText}))`;
}
