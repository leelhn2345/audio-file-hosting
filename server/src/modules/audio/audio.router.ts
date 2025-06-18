import { Static, Type as t } from "@sinclair/typebox";
import { FastifyInstance } from "fastify/types/instance.js";
import { FastifyRequest } from "fastify/types/request.js";

import {
  AudioGenreSchema,
  AudioPaginationSchema,
  AudioTableSchema,
  PostAudioSchema,
  PutAudioSchema,
} from "./audio.schema.js";

import { allDataSchemaExtender } from "@utils/schema.js";
import { getUserSession } from "@utils/session.js";

import {
  deleteAudio,
  deleteAudioFromGenre,
  getAllAudios,
  getAudio,
  postAudio,
  putAudio,
  putAudioToGenre,
} from "./audio.service.js";

const tags = ["audio"];

export async function audioRouter(server: FastifyInstance) {
  server.get("/audios", {
    schema: {
      tags,
      querystring: AudioPaginationSchema,
      response: {
        200: t.Composite([
          allDataSchemaExtender(AudioTableSchema),
          t.Object({ totalFileSize: t.Union([t.Number(), t.Null()]) }),
        ]),
      },
    },
    handler: async (
      req: FastifyRequest<{
        Querystring: Static<typeof AudioPaginationSchema>;
      }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const data = await getAllAudios(req.query, user);
      reply.send(data);
    },
  });

  server.get("/audio/:audioId", {
    schema: {
      tags,
      params: t.Object({ audioId: t.String({ format: "uuid" }) }),
      response: {
        200: t.Composite([
          AudioTableSchema,
          t.Object({
            genres: t.Array(t.Object({ id: t.String(), name: t.String() })),
          }),
        ]),
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
      body: PostAudioSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof PostAudioSchema> }>,
      reply,
    ) => {
      const user = getUserSession(req);
      await postAudio(req.body, user);
      reply.status(201).send({ message: "Audio successfully uploaded." });
    },
  });

  server.put("/audio/:audioId", {
    schema: {
      tags,
      params: t.Object({ audioId: t.String({ format: "uuid" }) }),
      body: PutAudioSchema,
    },
    handler: async (
      req: FastifyRequest<{
        Params: { audioId: string };
        Body: Static<typeof PutAudioSchema>;
      }>,
      reply,
    ) => {
      const user = getUserSession(req);
      await putAudio(req.params.audioId, req.body, user);
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
      const user = getUserSession(req);
      await deleteAudio(req.params.audioId, user);
      reply.send({ message: "Audio successfully deleted." });
    },
  });

  server.put("/audio/genre", {
    schema: {
      description: "tag an audio to a genre",
      tags,
      body: AudioGenreSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof AudioGenreSchema> }>,
      reply,
    ) => {
      await putAudioToGenre(req.body);
      reply.send({ message: "Audio added to genre successfully." });
    },
  });

  server.delete("/audio/genre", {
    schema: {
      description: "delete an audio from a genre",
      tags,
      body: AudioGenreSchema,
    },
    handler: async (
      req: FastifyRequest<{ Body: Static<typeof AudioGenreSchema> }>,
      reply,
    ) => {
      await deleteAudioFromGenre(req.body);
      reply.send({ message: "Audio deleted from genre successfully." });
    },
  });
}
