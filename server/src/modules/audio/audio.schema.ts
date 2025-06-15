import { Type as t } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";

import { audioTable } from "@db/tables/audio.table.js";

import { PaginationSchema } from "@utils/pagination.js";

export const AudioPaginationSchema = t.Composite([
  PaginationSchema,
  t.Object({
    textSearch: t.Optional(
      t.String({ description: "Searches relevant fields." }),
    ),
  }),
]);

export const AudioTableSchema = createInsertSchema(audioTable);
