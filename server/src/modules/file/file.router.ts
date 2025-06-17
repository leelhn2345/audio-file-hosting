import { Static, Type as t } from "@sinclair/typebox";
import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance.js";

import { BucketSchema } from "./file.schema.js";

import { FileObjectSchema } from "@utils/schema.js";
import { getUserSession } from "@utils/session.js";

import { getPresignedUrl, postPresignedUrl } from "./file.service.js";

const tags = ["file"];

export async function fileRouter(server: FastifyInstance) {
  server.post("/file/upload-url", {
    schema: {
      tags,
      body: t.Object({
        bucket: BucketSchema,
        fileName: t.String(),
        fileSize: t.Number(),
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
        Body: {
          bucket: Static<typeof BucketSchema>;
          fileName: string;
          fileSize: number;
        };
      }>,
      reply,
    ) => {
      const user = getUserSession(req);
      const { bucket, fileName, fileSize } = req.body;
      const { fileObject, presignedUrl } = await postPresignedUrl(
        bucket,
        fileName,
        fileSize,
        user,
      );
      reply.send({ fileObject, presignedUrl });
    },
  });

  server.get("/file/download-url", {
    schema: {
      tags,
      querystring: t.Omit(FileObjectSchema, ["fileSize"]),
      response: { 200: t.Object({ presignedUrl: t.String() }) },
    },
    handler: async (
      req: FastifyRequest<{ Querystring: Static<typeof FileObjectSchema> }>,
      reply,
    ) => {
      const presignedUrl = await getPresignedUrl(req.query);
      reply.send({ presignedUrl });
    },
  });
}
