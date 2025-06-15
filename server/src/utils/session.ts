import { Static } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";

import { UnauthorizedError } from "@errors/unauthorized.js";

import { UserSessionSchema } from "@modules/auth/auth.schema.js";

export function getUserSession(
  req: FastifyRequest,
): Static<typeof UserSessionSchema> {
  const { value } = req.userSession;
  if (!value) throw new UnauthorizedError();
  return value;
}
