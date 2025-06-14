import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

import { LoginSchema, SignUpSchema } from "./auth.schema.js";

import { logger } from "@utils/logger.js";
import { getUserSession } from "@utils/session.js";

import { login, registration } from "./auth.service.js";

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
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof LoginSchema> }>,
      reply,
    ) => {
      const data = await login(req.body);
      req.userSession.value = data;
      reply.send({ message: "User successfully login." });
    },
  });

  server.get("/auth/user-jwt", {
    schema: {
      tags,
    },
    handler: async (req) => {
      const user = getUserSession(req);
      logger.debug({ user });
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
