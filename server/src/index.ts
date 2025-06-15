import cors from "@fastify/cors";
import { fastifySecureSession } from "@fastify/secure-session";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fastify } from "fastify";

import { corsConfig } from "@config/cors.js";
import { initializeBuckets } from "@config/minio.js";
import { sessionConfig } from "@config/session.js";
import { swaggerConfig, swaggerUiConfig } from "@config/swagger.js";

import { authenticationMiddleware } from "@middleware/authentication.js";
import { errorHandler } from "@middleware/error-handler.js";

import { authRouter } from "@modules/auth/auth.router.js";
import { fileRouter } from "@modules/file/file.router.js";
import { userRouter } from "@modules/user/user.router.js";

import { logger } from "@utils/logger.js";
import { typeBoxFormatRegistry } from "@utils/string-validator.js";
import { setValidatorCompiler } from "@utils/validator.js";

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

// Swagger
if (process.env.NODE_ENV !== "production") {
  app.register(swagger, swaggerConfig);
  app.register(swaggerUI, swaggerUiConfig);
}

// schema validator customizations
setValidatorCompiler(app);
app.register(typeBoxFormatRegistry);

// init s3 storage
await initializeBuckets();

// Plugins
app.register(cors, corsConfig);
app.register(fastifySecureSession, sessionConfig);

// error handling
app.setErrorHandler(errorHandler);

// hooks
app.addHook("onRequest", authenticationMiddleware);

// Routers
app.register(authRouter);
app.register(userRouter);
app.register(fileRouter);

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
