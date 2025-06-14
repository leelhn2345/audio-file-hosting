import { Session } from "@fastify/secure-session";

import { UserSessionType } from "@modules/user/user.schema.ts";

declare module "fastify" {
  interface FastifyRequest {
    userSession: Session<{
      value: UserSessionType;
    }>;
  }
}

export {};
