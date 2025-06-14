import { Static, Type as t } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";

import { userTable } from "@db/tables/user.table.js";

export const UserSessionSchema = t.Object({
  id: t.String({ format: "uuid" }),
  email: t.String({ format: "email" }),
  name: t.String(),
});

export type UserSessionType = Static<typeof UserSessionSchema>;

const UserTableSchema = createInsertSchema(userTable);

export const UserSchema = t.Pick(UserTableSchema, ["name", "email"]);
