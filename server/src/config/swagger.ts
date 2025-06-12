import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    openapi: "3.1.0",
    info: {
      title: "Audio File Hosting",
      description: "<description for application here>",
      version: "0.1.0",
    },
  },
};

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: "/docs",
  staticCSP: true,
};
