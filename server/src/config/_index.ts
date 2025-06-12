// this file is for `process.env` type checks
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      NODE_ENV: "development" | "production";

      DATABASE_URL: string;

      BETTER_AUTH_SECRET: string;
      BETTER_AUTH_URL: string;
    }
  }
}
