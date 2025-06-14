import { FastifyInstance } from "fastify";

const tags = ["user"];

export async function userRouter(server: FastifyInstance) {
  server.put("/user", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
  });

  server.delete("/user", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
  });
}
