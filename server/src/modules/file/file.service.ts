import { Static } from "@sinclair/typebox";

import { Buckets, minioClient, presignExpiryDuration } from "@config/minio.js";

import { DuplicatedError } from "@errors/duplicate.js";

import { UserSessionType } from "@modules/user/user.schema.js";

import { FileObjectSchema } from "@utils/schema.js";

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
  const fileObject = { bucket, objectKey };
  return { fileObject, presignedUrl };
}

export async function getPresignedUrl(
  fileObject: Static<typeof FileObjectSchema>,
) {
  const { bucket, objectKey } = fileObject;

  const presignedUrl = await minioClient.presignedGetObject(
    bucket,
    objectKey,
    presignExpiryDuration,
  );

  return presignedUrl;
}
