import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

import { LoginSchema } from "./auth.schema.js";

import { login } from "./auth.service.js";

const tags = ["auth"];

export async function authRouter(server: FastifyInstance) {
  server.post("/auth/login", {
    schema: {
      tags,
      body: LoginSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof LoginSchema> }>,
      reply,
    ) => {
      await login(req.body);

      return reply.code(200).send({
        success: true,
        message: "Login successful",
      });
    },
  });

  server.get("/auth/user-jwt", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
  });

  server.post("/auth/logout", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
  });
}
