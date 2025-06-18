import { Static } from "@sinclair/typebox";
import { and, eq } from "drizzle-orm";

import { db } from "@db/index.js";
import { audioTable } from "@db/tables/audio.table.js";
import { genreTable } from "@db/tables/genre.table.js";

import { GenrePaginationSchema } from "./genre.schema.js";
import { UserSessionType } from "@modules/user/user.schema.js";

import {
  generateTextSearchCondition,
  queryOrderBy,
} from "@utils/pagination.js";

export async function getGenres(
  pagination: Static<typeof GenrePaginationSchema>,
  user: UserSessionType,
) {
  const textSearch = generateTextSearchCondition(
    [genreTable.name],
    pagination.textSearch,
  );

  const filter = and(textSearch, eq(genreTable.userId, user.id));

  const total = await db.$count(genreTable, filter);

  const orderBy = queryOrderBy(pagination.sortBy, pagination.sortOrder);

  const data = await db
    .select()
    .from(genreTable)
    .where(filter)
    .orderBy(orderBy)
    .limit(pagination.limit ?? 10)
    .offset(pagination.offset ?? 0);

  return { total, data };
}
