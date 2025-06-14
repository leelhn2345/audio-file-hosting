import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const audioTable = pgTable("audios", {
  id: uuid().primaryKey(),
  createdAt: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp({ withTimezone: true, mode: "string" })
    .notNull()
    .defaultNow(),
});
