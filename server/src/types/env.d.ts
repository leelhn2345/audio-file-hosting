// this file is for `process.env` type checks
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      NODE_ENV: "development" | "production";
      CLIENT_ORIGIN: string;

      DATABASE_URL: string;

      SESSION_KEY: string;
      SESSION_SECRET: string;

      MINIO_ENDPOINT: string;
      MINIO_PORT: number;
      MINIO_ACCESS_KEY: string;
      MINIO_SECRET_KEY: string;
    }
  }
}

export {};
