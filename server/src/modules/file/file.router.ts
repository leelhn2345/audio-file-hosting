import { Static, Type as t } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

import { BucketSchema, DownloadUrlSchema } from "./file.schema.js";

import { FileObjectSchema } from "@utils/schema.js";
import { getUserSession } from "@utils/session.js";

import { postPresignedUrl } from "./file.service.js";

const tags = ["file"];

export async function fileRouter(server: FastifyInstance) {
  server.post("/file/upload-url", {
    schema: {
      tags,
      body: t.Object({
        bucket: BucketSchema,
        fileName: t.String(),
      }),
      response: {
        200: t.Object({
          fileObject: FileObjectSchema,
          presignedUrl: t.String(),
        }),
      },
    },
    handler: async (
      req: FastifyRequest<{
        Body: { bucket: Static<typeof BucketSchema>; fileName: string };
      }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const { bucket, fileName } = req.body;
      const { objectKey, presignedUrl } = await postPresignedUrl(
        bucket,
        fileName,
        user,
      );
      reply.send({ fileObject: { bucket, objectKey }, presignedUrl });
    },
  });

  server.get("/file/download-url", {
    schema: {
      tags,
      querystring: DownloadUrlSchema,
    },
    handler: async (
      req: FastifyRequest<{ Querystring: Static<typeof DownloadUrlSchema> }>,
      reply,
    ) => {
      const { bucket, objectKey } = req.query;
    },
  });
}
