import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import pg from "pg";

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

  if (err instanceof pg.DatabaseError) {
    logger.error(`database error: ${err.message}`);

    let statusCode: number;
    switch (err.code) {
      case "23505": // unique constraint violated
        statusCode = 409;
        reply.status(statusCode).send({ message: `${err.detail}` });
        break;
      case "22007": // invalid syntax (e.g. timestamptz)
        statusCode = 400;
        reply.status(statusCode).send({ message: err.message });
        break;
      default:
        statusCode = 500;
        reply.status(statusCode).send({ message: `${err.message}` });
    }
  }

  logger.error("unknown error");
  reply
    .status(err.statusCode ?? 500)
    .send({ message: err.message || "something went wrong" });
}
