import { Buckets, minioClient, presignExpiryDuration } from "@config/minio.js";

import { DuplicatedError } from "@errors/duplicate.js";

import { UserSessionType } from "@modules/user/user.schema.js";

async function checkIfObjectExists(bucket: Buckets, objectKey: string) {
  try {
    await minioClient.statObject(bucket, objectKey);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
}

export async function postPresignedUrl(
  bucket: Buckets,
  fileName: string,
  user: UserSessionType,
) {
  const userId = user.id;
  const objectKey = `${userId}/${fileName}`;
  const exists = await checkIfObjectExists(bucket, objectKey);

  if (exists) {
    throw new DuplicatedError(
      `An item with the same name already exists. Please rename filename.`,
    );
  }

  const presignedUrl = await minioClient.presignedPutObject(
    bucket,
    objectKey,
    presignExpiryDuration,
  );
  return { objectKey, presignedUrl };
}
