import { Static } from "@sinclair/typebox";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "@db/index.js";
import { userTable } from "@db/tables/user.table.js";

import { NotFoundError } from "@errors/not-found.js";
import { UnauthorizedError } from "@errors/unauthorized.js";

import { LoginSchema, SignUpSchema } from "./auth.schema.js";

import { lower } from "@utils/sql.js";

export async function registration(data: Static<typeof SignUpSchema>) {
  const saltRounds = 10; // Cost factor (10-12 is recommended)
  const { password, ...rest } = data;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await db
    .insert(userTable)
    .values({
      id: randomUUID(),
      ...rest,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .returning({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
    })
    .then((x) => x[0]);

  return user;
}

export async function login(data: Static<typeof LoginSchema>) {
  const { email, password } = data;
  const user = await db
    .select()
    .from(userTable)
    .where(eq(lower(userTable.email), email.toLowerCase()))
    .then((x) => {
      if (x.length === 0) throw new NotFoundError("No user found.");
      return x[0];
    });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new UnauthorizedError("Invalid credentials.");
  }
  return { id: user.id, email: user.email, name: user.name };
}
