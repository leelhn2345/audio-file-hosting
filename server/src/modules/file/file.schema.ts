import { Type as t } from "@sinclair/typebox";

import { Buckets } from "@config/minio.js";

import { stringEnum } from "@utils/schema.js";

export const BucketSchema = stringEnum(Object.values(Buckets));

export const UploadUrlSchema = t.Object({
  bucket: BucketSchema,
  fileName: t.String(),
});
