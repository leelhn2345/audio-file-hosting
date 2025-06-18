import { Static, Type as t } from "@sinclair/typebox";
import { FastifyInstance, FastifyRequest } from "fastify";

import {
  AllGenreSchema,
  GenrePaginationSchema,
  GenreSchema,
} from "./genre.schema.js";

import { getUserSession } from "@utils/session.js";

import {
  deleteGenre,
  getGenreById,
  getGenres,
  putGenre,
} from "./genre.service.js";

const tags = ["genre"];
export async function genreRouter(server: FastifyInstance) {
  server.get("/genres", {
    schema: {
      tags,
      querystring: GenrePaginationSchema,
      response: { 200: AllGenreSchema },
    },
    handler: async (
      req: FastifyRequest<{
        Querystring: Static<typeof GenrePaginationSchema>;
      }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const res = await getGenres(req.query, user);
      reply.send(res);
    },
  });

  server.get("/genre/:genreId", {
    schema: {
      tags,
      params: t.Object({ genreId: t.String() }),
      response: { 200: GenreSchema },
    },
    handler: async (
      req: FastifyRequest<{ Params: { genreId: string } }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const res = await getGenreById(req.params.genreId, user);
      reply.send(res);
    },
  });

  server.put("/genre", {
    schema: {
      tags,
      body: t.Object({ name: t.String() }),
      response: { 201: t.Object({ id: t.String(), message: t.String() }) },
    },
    handler: async (req: FastifyRequest<{ Body: { name: string } }>, reply) => {
      const user = getUserSession(req);
      const newId = await putGenre(req.body.name, user);
      reply
        .status(201)
        .send({ id: newId, message: "Genre created successfully." });
    },
  });

  server.delete("/genre/:genreId", {
    schema: {
      tags,
      params: t.Object({ genreId: t.String() }),
      response: { 204: t.Object({ message: t.String() }) },
    },
    handler: async (
      req: FastifyRequest<{ Params: { genreId: string } }>,
      reply,
    ) => {
      const user = getUserSession(req);
      await deleteGenre(req.params.genreId, user);
      reply.status(204).send({ message: "Genre deleted successfully." });
    },
  });
}
