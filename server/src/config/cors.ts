import { FastifyCorsOptions } from "@fastify/cors";

export const corsConfig: FastifyCorsOptions = {
  origin: [process.env.CLIENT_ORIGIN],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};
