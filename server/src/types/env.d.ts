// this file is for `process.env` type checks
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      NODE_ENV: "development" | "production";
      CLIENT_ORIGIN: string;

      DATABASE_URL: string;

      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
    }
  }
}

export {};
