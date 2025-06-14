import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fastify } from "fastify";

import { corsConfig } from "@config/cors.js";
import { swaggerConfig, swaggerUiConfig } from "@config/swagger.js";

import { errorHandler } from "@middleware/error-handler.js";

import { authRouter } from "@modules/auth.router.js";

import { logger } from "@utils/logger.js";

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

// Swagger
if (process.env.NODE_ENV !== "production") {
  app.register(swagger, swaggerConfig);
  app.register(swaggerUI, swaggerUiConfig);
}

// error handling
app.setErrorHandler(errorHandler);

// CORS
app.register(cors, corsConfig);

// Routers
app.register(authRouter);

/** for api health check */
app.get("/api/health", () => {
  return { message: "server is up", now: new Date() };
});

const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV.trim().toLowerCase();

if (!(environment === "development" || environment === "production")) {
  throw new Error(
    "use either `development` or `uat` or `production' for `NODE_ENV`",
  );
}

app.listen({ host: "0.0.0.0", port }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`server listening at ${address}`);
});
