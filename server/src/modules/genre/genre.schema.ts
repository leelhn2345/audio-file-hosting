import { Type as t } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";

import { genreTable } from "@db/tables/genre.table.js";

import { AudioTableSchema } from "@modules/audio/audio.schema.js";

import { PaginationSchema } from "@utils/pagination.js";
import { allDataSchemaExtender } from "@utils/schema.js";

export const GenrePaginationSchema = t.Composite([
  PaginationSchema,
  t.Object({
    textSearch: t.Optional(
      t.String({ description: "Searches relevant fields." }),
    ),
    pagination: t.Optional(
      t.Boolean({ description: "If `true`, `offset` & `limit` will be used." }),
    ),
  }),
]);

export const GenreTableSchema = createInsertSchema(genreTable);

export const AllGenreSchema = allDataSchemaExtender(GenreTableSchema);

export const GenreSchema = t.Object({
  name: t.String(),
  totalFileSize: t.Number(),
  audios: t.Array(AudioTableSchema),
});
