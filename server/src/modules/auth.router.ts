import { FastifyInstance } from "fastify";

const tags = ["auth"];

export async function authRouter(server: FastifyInstance) {
  server.post("/auth/login", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
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
