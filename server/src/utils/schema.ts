import { TSchema, Type as t } from "@sinclair/typebox";

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
