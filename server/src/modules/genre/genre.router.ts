import { Type as t } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

const tags = ["genre"];
export async function genreRouter(server: FastifyInstance) {
  server.get("/genres", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
  });

  server.get("/genre/:genreId", {
    schema: {
      tags,
      params: t.Object({ genreId: t.String() }),
    },
    handler: async (
      req: FastifyRequest<{ Params: { genreId: string } }>,
      reply,
    ) => {},
  });

  server.post("/genre", {
    schema: {
      tags,
      body: t.Object({ name: t.String() }),
    },
    handler: async (
      req: FastifyRequest<{ Body: { name: string } }>,
      reply,
    ) => {},
  });

  server.delete("/genre/:genreId", {
    schema: {
      tags,
      params: t.Object({ genreId: t.String() }),
    },
    handler: async (req, reply) => {},
  });
}
