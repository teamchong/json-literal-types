import type { JsonValue, JsonString, JsonNumber, JsonBoolean, JsonNull, JsonObject, JsonArray, Parse } from "./JsonTypes"

/**
 * ParseInferred are used to infer the TypeScript type from a JSON string.
 * This allows for using JSON strings directly as type definitions in TypeScript, ensuring type safety and preventing runtime errors.
 */
export type ParseInferred<S extends string> = InferJsonType<Parse<S>>

/**
 * InferJsonType takes a specific JSON value and converts it to a broader TypeScript type.
 * For example:
 * - A specific string value becomes 'string'.
 * - A specific number value becomes 'number'.
 * - A specific object with defined property values becomes an object with those properties set to broader types (e.g., { "a": "abc" } becomes { "a": string }).
 * - An array of specific values becomes an array of broader types.
 */
export type InferJsonType<J>
  = J extends any[] ? J[number] extends object ? J[number][] : InferJsonType<J[number]>[]
  : J extends object ? { [K in keyof J]: InferJsonType<J[K]> }
  : J extends string ? string
  : J extends number ? number
  : J extends boolean ? boolean
  : J
