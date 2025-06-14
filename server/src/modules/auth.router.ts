import { Static } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

import { LoginSchema } from "./auth.schema.js";

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
