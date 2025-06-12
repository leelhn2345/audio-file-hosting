import { Type as t } from "@sinclair/typebox";

export const LoginSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8, maxLength: 32 }),
});

