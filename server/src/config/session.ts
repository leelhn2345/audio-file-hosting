import { SecureSessionPluginOptions } from "@fastify/secure-session";
import fs from "fs";
import path from "path";

type FastifySecureSession = SecureSessionPluginOptions &
  Required<Pick<SecureSessionPluginOptions, "sessionName">>;

export const sessionConfig: FastifySecureSession[] = [
  {
    sessionName: "userSession",
    key: fs.readFileSync(path.join(process.cwd(), "secret-key")),
    secret: process.env.SESSION_SECRET,
    cookie: {
      // maxAge is in seconds.
      // user will lose access after 60 minutes of inactivity.
      //
      // check either auth middleware for maxAge refresh.
      maxAge: 60 * 60,
      path: "/",
      secure: true,
      sameSite: "none",
      httpOnly: true,
    },
  },
];
