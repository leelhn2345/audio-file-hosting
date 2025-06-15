import { Static, Type as t } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

import { LoginSchema, SignUpSchema } from "./auth.schema.js";

import { getUserSession } from "@utils/session.js";

import { getUserJwt, login, registration } from "./auth.service.js";

const tags = ["auth"];

export async function authRouter(server: FastifyInstance) {
  server.post("/auth/signup", {
    schema: {
      tags,
      body: SignUpSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof SignUpSchema> }>,
      reply,
    ) => {
      await registration(req.body);
      reply.status(201).send({ message: "User successfully registered." });
    },
  });

  server.post("/auth/login", {
    schema: {
      tags,
      body: LoginSchema,
      response: { 200: t.Object({ name: t.String(), email: t.String() }) },
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof LoginSchema> }>,
      reply,
    ) => {
      const data = await login(req.body);
      req.userSession.value = data;
      reply.send(data);
    },
  });

  server.post("/auth/user-jwt", {
    schema: {
      tags,
      response: { 200: t.String() },
    },
    handler: async (req, reply) => {
      const user = getUserSession(req);

      const jwt = await getUserJwt(user);
      reply.send(jwt);
      // logger.debug({ user });
    },
  });

  server.post("/auth/logout", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {
      req.userSession.delete();
      reply.code(200).send({
        message: "User successfully logout.",
      });
    },
  });
}
