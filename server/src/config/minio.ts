import { Client } from "minio";

import { logger } from "@utils/logger.js";

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: process.env.MINIO_PORT,
  useSSL: process.env.NODE_ENV === "production",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export enum Buckets {
  AUDIO = "audio",
}

// Initialize bucket if it doesn't exist
export async function initializeBuckets() {
  try {
    const buckets = Object.values(Buckets);
    buckets.map(async (bucket) => {
      const bucketExists = await minioClient.bucketExists(bucket);
      if (!bucketExists) {
        await minioClient.makeBucket(bucket);
        logger.info(`Bucket '${bucket}' created successfully`);
      }
    });
  } catch (error) {
    logger.error("Error initializing MinIO bucket:", error);
    throw error;
  }
}

