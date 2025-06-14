import { randomUUID } from "crypto";
import { Readable } from "stream";

import { Buckets, minioClient } from "../config/minio.js";

export interface UploadResult {
  objectName: string;
  size: number;
  etag: string;
}

export interface FileMetadata {
  originalName: string;
  contentType: string;
  size: number;
  uploadedAt: Date;
  userId: string;
}

export class FileStorageService {
  async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    contentType: string,
    userId: string,
  ): Promise<UploadResult> {
    const fileExtension = originalName.split(".").pop() || "";
    const objectName = `${userId}/${randomUUID()}.${fileExtension}`;

    const metadata = {
      "original-name": originalName,
      "content-type": contentType,
      "uploaded-at": new Date().toISOString(),
      "user-id": userId,
    };

    try {
      const result = await minioClient.putObject(
        Buckets.AUDIO,
        objectName,
        fileBuffer,
        fileBuffer.length,
        {
          "Content-Type": contentType,
          ...metadata,
        },
      );

      return {
        objectName,
        size: fileBuffer.length,
        etag: result.etag,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`);
    }
  }

  async downloadFile(objectName: string): Promise<Readable> {
    try {
      return await minioClient.getObject(Buckets.AUDIO, objectName);
    } catch (error) {
      throw new Error(`Failed to download file: ${error}`);
    }
  }

  async deleteFile(objectName: string): Promise<void> {
    try {
      await minioClient.removeObject(Buckets.AUDIO, objectName);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error}`);
    }
  }

  async getFileMetadata(objectName: string): Promise<FileMetadata> {
    try {
      const stat = await minioClient.statObject(Buckets.AUDIO, objectName);

      return {
        originalName: stat.metaData?.["original-name"] || "unknown",
        contentType:
          stat.metaData?.["content-type"] || "application/octet-stream",
        size: stat.size,
        uploadedAt: new Date(
          stat.metaData?.["uploaded-at"] || stat.lastModified,
        ),
        userId: stat.metaData?.["user-id"] || "unknown",
      };
    } catch (error) {
      throw new Error(`Failed to get file metadata: ${error}`);
    }
  }

  async generatePresignedUrl(
    objectName: string,
    expiry = 7 * 24 * 60 * 60,
  ): Promise<string> {
    try {
      return await minioClient.presignedGetObject(
        Buckets.AUDIO,
        objectName,
        expiry,
      );
    } catch (error) {
      throw new Error(`Failed to generate presigned URL: ${error}`);
    }
  }
}

