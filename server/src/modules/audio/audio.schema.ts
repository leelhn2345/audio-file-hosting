import { Type as t } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";

import { audioTable } from "@db/tables/audio.table.js";

import { PaginationSchema } from "@utils/pagination.js";
import { FileObjectSchema, optional } from "@utils/schema.js";

export const AudioPaginationSchema = t.Composite([
  PaginationSchema,
  t.Object({
    textSearch: t.Optional(
      t.String({ description: "Searches relevant fields." }),
    ),
    pagination: t.Optional(
      t.Boolean({
        description: "If set to `true`, `offset` & `limit` will be used.",
      }),
    ),
  }),
]);

export const AudioTableSchema = createInsertSchema(audioTable, {
  fileObject: FileObjectSchema,
  releaseDate: optional(t.String({ format: "date-time" })),
});

export const PostAudioSchema = t.Pick(AudioTableSchema, [
  "name",
  "fileObject",
  "description",
  "artist",
  "releaseDate",
]);

export const PutAudioSchema = PostAudioSchema;

export const AudioGenreSchema = t.Object({
  audioId: t.String(),
  genreId: t.String(),
});
