import { Session } from "@fastify/secure-session";

declare module "fastify" {
  interface FastifyRequest {
    userSession: Session<{
      value: { id: string; email: string; name: string };
    }>;
  }
}

export {};
