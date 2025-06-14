import { Buckets } from "@config/minio.js";

import { stringEnum } from "@utils/schema.js";

export const BucketSchema = stringEnum(Object.values(Buckets));
