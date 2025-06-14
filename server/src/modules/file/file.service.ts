import { Buckets, minioClient, presignExpiryDuration } from "@config/minio.js";

import { UserSessionType } from "@modules/user/user.schema.js";

export async function postPresignedUrl(
  bucket: Buckets,
  fileName: string,
  user: UserSessionType,
) {
  const userId = user.id;
  const presignedUrl = await minioClient.presignedPutObject(
    bucket,
    `${userId}/${fileName}`,
    presignExpiryDuration,
  );
  return presignedUrl;
}
