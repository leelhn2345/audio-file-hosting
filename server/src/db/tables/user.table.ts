import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid().primaryKey(),
  name: text().notNull(),
  email: text().unique().notNull(),
  password: text().notNull(),
  createdAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
  updatedAt: timestamp({ mode: "string", withTimezone: true }).notNull(),
});
