import type { Digit } from './Digit'
import type { ParseArray } from './ParseArray'
import type { ParseNumber } from './ParseNumber'
import type { ParseObject } from './ParseObject'
import type { ParseString } from './ParseString'
import type { Peek } from './Peek'

/**
 * Ensures that only valid JSON strings of a specific type are accepted.
 * This helps prevent runtime errors by enforcing type validation at compile time.
 */
export type JsonValue<S extends string, V = Parse<S>> = [V] extends [never] ? never : S
export type JsonString<S extends string, V = Parse<S>> = [V] extends [never] ? never : V extends string ? S : never
export type JsonNumber<S extends string, V = Parse<S>> = [V] extends [never] ? never : V extends number ? S : never
export type JsonBoolean<S extends string, V = Parse<S>> = [V] extends [never] ? never : V extends boolean ? S : never
export type JsonNull<S extends string, V = Parse<S>> = [V] extends [never] ? never : V extends null ? S : never
export type JsonObject<S extends string, V = Parse<S>> = [V] extends [never] ? never : V extends any[] ? never : V extends object ? S : never
export type JsonArray<S extends string, V = Parse<S>> = [V] extends [never] ? never : V extends any[] ? S : never
export type Parse<S extends string> = ParseValue<S> extends [infer L extends string, infer V] ? Peek<S, L> extends [] ? V : never : never

/**
 * Recursively parses a JSON string to ensure it is valid and returns the parsed value.
 * Handles objects, arrays, strings, numbers, booleans, and null values.
 */
export type ParseValue<S extends string, L extends string = '', C extends string[] = Peek<S, L>>
  = C extends [infer L extends string, '{'] ? ParseObject<S, `${L}{`>
  : C extends [infer L extends string, '['] ? ParseArray<S, `${L}[`>
  : C extends [infer L extends string, 'n'] ? S extends `${L}null${any}` ? [`${L}null`, null] : []
  : C extends [infer L extends string, 't'] ? S extends `${L}true${any}` ? [`${L}true`, true] : []
  : C extends [infer L extends string, 'f'] ? S extends `${L}false${any}` ? [`${L}false`, false] : []
  : C extends [infer L extends string, '"'] ? ParseString<S, `${L}"`>
  : C extends [infer L extends string, '-'] ? S extends `${L}-${infer D}${any}` ? D extends Digit ? ParseNumber<S, `${L}-${D}`, `-${D}`> : [] : []
  : C extends [infer L extends string, infer C extends Digit] ? ParseNumber<S, `${L}${C}`, C>
  : []       // unexpected token

