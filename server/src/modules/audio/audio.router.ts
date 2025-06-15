import { Static, Type as t } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance.js";
import { FastifyRequest } from "fastify/types/request.js";

import { AudioPaginationSchema, AudioTableSchema } from "./audio.schema.js";

import { getUserSession } from "@utils/session.js";

import { getAudio } from "./audio.service.js";

const tags = ["audio"];

export async function audioRouter(server: FastifyInstance) {
  server.get("/audios", {
    schema: {
      tags,
      querystring: AudioPaginationSchema,
    },
    handler: async (
      req: FastifyRequest<{ Params: Static<typeof AudioPaginationSchema> }>,
      reply,
    ) => {},
  });

  server.get("/audio/:audioId", {
    schema: {
      tags,
      params: t.Object({ audioId: t.String({ format: "uuid" }) }),
      response: {
        200: AudioTableSchema,
      },
    },
    handler: async (
      req: FastifyRequest<{ Params: { audioId: string } }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const data = await getAudio(req.params.audioId, user);
      reply.send(data);
    },
  });

  server.post("/audio", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {
      reply.status(201).send({ message: "Audio successfully uploaded." });
    },
  });

  server.put("/audio/:audioId", {
    schema: {
      tags,
      params: t.Object({ audioId: t.String({ format: "uuid" }) }),
    },
    handler: async (
      req: FastifyRequest<{ Params: { audioId: string } }>,
      reply,
    ) => {
      reply.send({ message: "Audio successfully modified." });
    },
  });

  server.delete("/audio/:audioId", {
    schema: {
      tags,
      params: t.Object({ audioId: t.String({ format: "uuid" }) }),
    },
    handler: async (
      req: FastifyRequest<{ Params: { audioId: string } }>,
      reply,
    ) => {
      reply.send({ message: "Audio successfully deleted." });
    },
  });
}
