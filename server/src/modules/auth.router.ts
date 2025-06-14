import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

import { LoginSchema } from "./auth.schema.js";

import { AuthService } from "./auth.service.js";

const tags = ["auth"];

export async function authRouter(server: FastifyInstance) {
  const authService = new AuthService();

  server.post("/auth/login", {
    schema: {
      tags,
      body: LoginSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof LoginSchema> }>,
      reply,
    ) => {},
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
    handler: async (req, reply) => {
      reply.code(200).send({
        message: "Logout successful",
      });
    },
  });
}
