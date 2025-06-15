import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { userTable } from "./user.table.js";

export const genreTable = pgTable("genres", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  userId: uuid()
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
});
