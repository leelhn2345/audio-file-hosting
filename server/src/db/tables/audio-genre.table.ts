import { pgTable, uuid } from "drizzle-orm/pg-core";

import { audioTable } from "./audio.table.js";
import { genreTable } from "./genre.table.js";

export const audioGenre = pgTable("audios_genres", {
  id: uuid().primaryKey(),
  audioId: uuid()
    .references(() => audioTable.id, { onDelete: "cascade" })
    .notNull(),
  genreId: uuid()
    .references(() => genreTable.id, { onDelete: "cascade" })
    .notNull(),
});
