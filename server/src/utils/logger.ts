import { pino } from "pino";
import { PinoPretty } from "pino-pretty";

const prodLogger = pino();

const devLogger = pino(
  {
    level: "debug",
  },
  PinoPretty.build({}),
);

export const logger =
  process.env.NODE_ENV === "production" ? prodLogger : devLogger;
