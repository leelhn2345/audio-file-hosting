import { Static, Type as t } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

import { BucketSchema } from "./file.schema.js";

import { getUserSession } from "@utils/session.js";

import { postPresignedUrl } from "./file.service.js";

const tags = ["file"];

export async function fileRouter(server: FastifyInstance) {
  server.post("/presigned-url", {
    schema: {
      tags,
      body: t.Object({
        bucket: BucketSchema,
        fileName: t.String(),
      }),
    },
    handler: async (
      req: FastifyRequest<{
        Body: { bucket: Static<typeof BucketSchema>; fileName: string };
      }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const { bucket, fileName } = req.body;
      const presignedUrl = await postPresignedUrl(bucket, fileName, user);
      reply.send({ data: presignedUrl });
    },
  });

  server.get("/presigned-url", {
    schema: {
      tags,
    },
    handler: async (req, reply) => {},
  });
}
