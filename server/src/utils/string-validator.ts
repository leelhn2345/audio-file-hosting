import { FormatRegistry } from "@sinclair/typebox";

/**
 * https://github.com/sinclairzx81/typebox/tree/master/example/formats
 */
export function typeBoxFormatRegistry() {
  FormatRegistry.Set("uuid", IsUuid);
  FormatRegistry.Set("email", IsEmail);
}

const Email =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

function IsEmail(value: string): boolean {
  return Email.test(value);
}

const Uuid = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

function IsUuid(value: string): boolean {
  return Uuid.test(value);
}
