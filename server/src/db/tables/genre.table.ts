import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { userTable } from "./user.table.js";

export const genreTable = pgTable(
  "genres",
  {
    id: uuid().primaryKey(),
    name: text().notNull(),
    userId: uuid()
      .references(() => userTable.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return [uniqueIndex("uniqueUserGenre").on(table.name, table.userId)];
  },
);
