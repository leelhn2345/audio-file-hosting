import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { userTable } from "./user.table.js";

export const genreTable = pgTable(
  "genres",
  {
    id: uuid().primaryKey(),
    name: text().notNull(),
    userId: uuid()
      .references(() => userTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return [uniqueIndex("uniqueUserGenre").on(table.name, table.userId)];
  },
);
