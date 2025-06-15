import { SchemaOptions, Static, TSchema, Type as t } from "@sinclair/typebox";

import { Buckets } from "@config/minio.js";

/**
 * This function extends the schema to be either `undefined` or `null`.
 * Generates nullable value for **OpenAPI (v3.1.0)** specs.
 *
 * If you want to make it only **optional** for OpenAPI specs,
 * please use `t.Optional(TSchema)`.
 */
export function optional<T extends TSchema>(schema: T) {
  return t.Optional(nullable(schema));
}

/**
 * extends schema to be nullable.
 */
export function nullable<T extends TSchema>(schema: T) {
  return t.Union([schema, t.Null()]);
}

/**
 * generate enum type for OpenAPI **queryString** specs.
 *
 * @link https://github.com/sinclairzx81/typebox?tab=readme-ov-file#unsafe-types
 */
export function stringEnum<T extends string[]>(
  values: Readonly<[...T]>,
  schemaOptions?: SchemaOptions,
  // description?: string,
) {
  return t.Unsafe<T[number]>({
    type: "string",
    enum: values,
    ...schemaOptions,
  });
}

export const FileObjectSchema = t.Object({
  bucket: stringEnum(Object.values(Buckets)),
  objectKey: t.String(),
});

export type FileObjectType = Static<typeof FileObjectSchema>;
