import {
  json,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { FileObjectType } from "@utils/schema.js";

import { userTable } from "./user.table.js";

export const audioTable = pgTable(
  "audios",
  {
    id: uuid().primaryKey(),
    name: text().notNull(),
    fileObject: json().$type<FileObjectType>().notNull(),
    description: text(),
    artist: text(),
    releaseDate: timestamp({ withTimezone: true, mode: "string" }),
    uploadedBy: uuid()
      .references(() => userTable.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return [uniqueIndex("uniqueSongIdx").on(table.name, table.uploadedBy)];
  },
);
