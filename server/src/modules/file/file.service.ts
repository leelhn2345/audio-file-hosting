import { Buckets, minioClient, presignExpiryDuration } from "@config/minio.js";

import { UserSessionType } from "@modules/user/user.schema.js";

export async function postPresignedUrl(
  bucket: Buckets,
  fileName: string,
  user: UserSessionType,
) {
  const userId = user.id;
  const objectKey = `${userId}/${fileName}`;
  const presignedUrl = await minioClient.presignedPutObject(
    bucket,
    objectKey,
    presignExpiryDuration,
  );
  return { objectKey, presignedUrl };
}
