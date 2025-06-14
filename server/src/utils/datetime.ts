/**
 * returns current datetime in ISO String.
 *
 * @example
 * const foo = isoDatetime()
 * logger.info(foo) // 2024-10-10T07:52:53.118Z
 */
export function isoDatetime() {
  return new Date().toISOString();
}
