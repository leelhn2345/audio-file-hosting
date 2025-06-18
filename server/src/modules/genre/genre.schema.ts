import { Type as t } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";

import { genreTable } from "@db/tables/genre.table.js";

import { PaginationSchema } from "@utils/pagination.js";
import { allDataSchemaExtender } from "@utils/schema.js";

export const GenrePaginationSchema = t.Composite([
  PaginationSchema,
  t.Object({
    textSearch: t.Optional(
      t.String({ description: "Searches relevant fields." }),
    ),
  }),
]);

export const GenreTableSchema = createInsertSchema(genreTable);

export const AllGenreSchema = allDataSchemaExtender(GenreTableSchema);
