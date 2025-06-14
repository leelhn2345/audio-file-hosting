import { Type as t } from "@sinclair/typebox";
import { createInsertSchema } from "drizzle-typebox";

import { userTable } from "@db/tables/user.table.js";

const UserTableSchema = createInsertSchema(userTable);

export const UserSchema = t.Pick(UserTableSchema, ["name", "email"]);
