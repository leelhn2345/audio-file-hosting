import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "string" }).notNull(),
});
