import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { CustomError } from "@errors/_custom-error.js";

import { logger } from "@utils/logger.js";

export async function errorHandler(
  err: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply,
) {
  logger.error(err);

  if (err.validation) {
    logger.error("validation error");
    reply.status(err.statusCode ?? 400).send({ message: err.validation });
  }

  if (err instanceof CustomError) {
    logger.error("custom error");
    reply.status(err.statusCode).send({
      message: err.message,
      ...(err.data && { data: err.data }),
    });
  }

  logger.error("unknown error");
  reply
    .status(err.statusCode ?? 500)
    .send({ message: err.message || "something went wrong" });
}
