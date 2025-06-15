import { Ajv, Options, Schema, ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import { fastUri } from "fast-uri";
import { FastifyInstance, FastifyRequest } from "fastify";

/**
 * Returns default fastify's ajv config, with ajv options override as param.
 */
function fastifyAjvConfig(options?: Options) {
  const customAjv = addFormats.default(
    new Ajv({
      // change data type of data to match type keyword
      coerceTypes: options?.coerceTypes ?? "array",
      // replace missing properties and items with the values from corresponding default keyword
      useDefaults: true,
      // remove additional properties if additionalProperties is set to false, see: https://ajv.js.org/guide/modifying-data.html#removing-additional-properties
      removeAdditional: options?.removeAdditional ?? true,
      uriResolver: fastUri,
      addUsedSchema: false,
      // Explicitly set allErrors to `false`.
      // When set to `true`, a DoS attack is possible.
      allErrors: false,
    }),
  );

  return customAjv;
}

/**
 * Define types for HTTP parts and the function
 */
type HttpPart = "body" | "params" | "querystring" | "headers";

interface ValidatorCompilerRequest extends FastifyRequest {
  httpPart?: HttpPart; // httpPart must match keys in schemaCompilers
  schema: Schema; // Schema to be compiled
}

// custom schema validator compilers
const schemaCompilers: Record<HttpPart, Ajv> = {
  body: fastifyAjvConfig({
    coerceTypes: false,
    removeAdditional: "all",
  }),
  params: fastifyAjvConfig(),
  querystring: fastifyAjvConfig(),
  headers: fastifyAjvConfig(),
};

/**
 * Function to get the appropriate schema compiler
 */
function getValidatorCompiler(req: ValidatorCompilerRequest): ValidateFunction {
  if (!req.httpPart) {
    throw new Error("Missing httpPart");
  }

  const compiler = schemaCompilers[req.httpPart];
  if (!compiler) {
    throw new Error(`Missing compiler for ${req.httpPart}`);
  }

  return compiler.compile(req.schema);
}

/**
 * Set the validator compiler for Fastify
 */
export function setValidatorCompiler(server: FastifyInstance) {
  server.setValidatorCompiler((req) =>
    getValidatorCompiler(req as ValidatorCompilerRequest),
  );

  // Set serializer compiler for response schemas
  server.setSerializerCompiler(({ schema }) => {
    // Use one of the existing compiled validators to avoid import issues
    const ajv = schemaCompilers.body;
    const validate = ajv.compile(schema);

    return (data) => {
      // validate() modifies data in-place when removeAdditional is true
      validate(data);
      return JSON.stringify(data);
    };
  });
}
