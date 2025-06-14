import { Static } from "@sinclair/typebox";
import { eq } from "drizzle-orm";

import { db } from "@db/index.js";
import { userTable } from "@db/tables/user.table.js";

import { NotFoundError } from "@errors/not-found.js";

import { UserSchema, UserSessionType } from "./user.schema.js";

import { isoDatetime } from "@utils/datetime.js";

export async function getUserData(user: UserSessionType) {
  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, user.id))
    .then((x) => {
      if (x.length === 0) throw new NotFoundError("User not found.");
      return x[0];
    });

  return userData;
}

export async function putUserData(
  data: Static<typeof UserSchema>,
  user: UserSessionType,
): Promise<UserSessionType> {
  const newData = await db
    .update(userTable)
    .set({ ...data, updatedAt: isoDatetime() })
    .where(eq(userTable.id, user.id))
    .returning({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
    })
    .then((x) => {
      if (x.length === 0) throw new NotFoundError("User not found.");
      return x[0];
    });

  return newData;
}
