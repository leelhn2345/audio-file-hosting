import { DrizzleQueryError } from "drizzle-orm/errors";
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

  if (err instanceof DrizzleQueryError) {
    const { cause } = err;

    if (cause instanceof pg.DatabaseError) {
      switch (cause.code) {
        case "23505": // unique constraint violated
          reply.status(409).send({ message: `${cause.detail}` });
          break;
        case "22007": // invalid syntax (e.g. timestamptz)
          reply.status(400).send({ message: err.message });
          break;
        default:
          reply.status(500).send({ message: `${cause.message}` });
      }
    }
    reply.status(500).send({ message: "Something went wrong." });
  }

  logger.error("unknown error");
  reply
    .status(err.statusCode ?? 500)
    .send({ message: err.message || "something went wrong" });
}
