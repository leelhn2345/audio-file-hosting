import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const genreTable = pgTable("genres", {
  id: uuid().primaryKey(),
  name: text().notNull(),
});
