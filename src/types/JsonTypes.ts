import type { ExtractUnicodeCharacter } from './UnicodeHelpers'

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
type ParseValue<S extends string, L extends string = '', C extends string[] = Peek<S, L>>
  = C extends [infer L extends string, '{'] ? ParseObject<S, `${L}{`>
  : C extends [infer L extends string, '['] ? ParseArray<S, `${L}[`>
  : C extends [infer L extends string, 'n'] ? S extends `${L}null${any}` ? [`${L}null`, null] : []
  : C extends [infer L extends string, 't'] ? S extends `${L}true${any}` ? [`${L}true`, true] : []
  : C extends [infer L extends string, 'f'] ? S extends `${L}false${any}` ? [`${L}false`, false] : []
  : C extends [infer L extends string, '"'] ? ParseString<S, `${L}"`>
  : C extends [infer L extends string, '-'] ? S extends `${L}-${infer D}${any}` ? D extends Digit ? ParseNumber<S, `${L}-${D}`, `-${D}`> : [] : []
  : C extends [infer L extends string, infer C extends Digit] ? ParseNumber<S, `${L}${C}`, C>
  : []       // unexpected token

/**
 * Parses a JSON string value, handling escape sequences and ensuring the string is valid.
 */
type ParseString<S extends string, L extends string = '"', Result extends string = ''>
  = S extends `${L}"${any}` ? [`${L}"`, Result]
  : S extends `${L}${'\n' | '\r' | '\t'}${any}` ? []  // those chars must be escape
  : S extends `${L}\\\\${any}` ? ParseString<S, `${L}\\\\`, `${Result}\\`>
  : S extends `${L}\\"${any}` ? ParseString<S, `${L}\\"`, `${Result}\"`>
  : S extends `${L}\\b${any}` ? ParseString<S, `${L}\\b`, `${Result}\b`>
  : S extends `${L}\\f${any}` ? ParseString<S, `${L}\\f`, `${Result}\f`>
  : S extends `${L}\\n${any}` ? ParseString<S, `${L}\\n`, `${Result}\n`>
  : S extends `${L}\\r${any}` ? ParseString<S, `${L}\\r`, `${Result}\r`>
  : S extends `${L}\\t${any}` ? ParseString<S, `${L}\\t`, `${Result}\t`>
  : S extends `${L}\\u${infer E}${infer F}${infer G}${infer H}${any}` ? E | F | G | H extends Hex
    ? ParseString<S, `${L}\\u${E}${F}${G}${H}`, `${Result}${ExtractUnicodeCharacter<`${E}${F}${G}${H}`>}`>
    : []      // expecting 4 hex chars
  : S extends `${L}\\${any}` ? []        // unexpected escape sequence
  : S extends `${L}${infer C}${any}` ? ParseString<S, `${L}${C}`, `${Result}${C}`>
  : []        // expecting token

/**
 * Parses a JSON object, ensuring the keys and values are valid.
 */
type ParseObject<S extends string, L extends string = '{', Result extends object = {}, C extends string[] = Peek<S, L>>
  = C extends [infer L extends string, '}'] ? Result extends {} ? [`${L}}`, {}] : []
  : ParseString<S, `${Peek<S, L>[0]}"`> extends [infer L extends string, infer P extends string]
    ? ParseValue<S, `${Peek<S, L>[0]}:`> extends [infer L extends string, infer V]
      ? Peek<S, L> extends infer C extends string[]
        ? C extends [infer L extends string, ','] ? ParseObject<S, `${L},`, { [K in keyof Result | P]: K extends keyof Result ? Result[K] : V }>
        : C extends [infer L extends string, '}'] ? [`${L}}`, { [K in keyof Result | P]: K extends keyof Result ? Result[K] : V }]
        : []  // expecting , or }
      : []    // expecting , or }
    : []      // expecting Value
  : []        // expecting Name

/**
 * Parses a JSON array, ensuring all elements are valid.
 */
type ParseArray<S extends string, L extends string = '[', Result extends unknown[] = []>
  = Peek<S, L> extends [infer L extends string, ']'] ? Result extends [] ? [`${L}]`, []] : []
  : ParseValue<S, L> extends [infer L extends string, infer V]
    ? Peek<S, L> extends [infer L extends string, ','] ? ParseArray<S, `${L},`, [...Result, V]>
    : Peek<S, L> extends [infer L extends string, ']'] ? [`${L}]`, [...Result, V]]
    : []      // expecting , or ]
  : []        // expecting ]

/**
 * Parses a JSON number, handling decimal points and exponents.
 */
type ParseNumber<S extends string, L extends string = '', Result extends string = ''>
  = S extends `${L}${infer C}${any}`
    ? C extends Digit ? ParseNumber<S, `${L}${PeekDigits<S, L>}`, `${Result}${PeekDigits<S, L>}`>
    : C extends '.' ? Result extends `${any}.${any}` ? [] : ParseNumber<S, `${L}.`, `${Result}.`>
    : C extends 'e' | 'E'
      ? S extends `${L}${C}-${Digit}${any}` ? ParseExponent<Result, `-${PeekDigits<S, `${L}${C}-`>}`, `${L}${C}-${PeekDigits<S, `${L}${C}-`>}`>
      : S extends `${L}${C}+${Digit}${any}` ? ParseExponent<Result, PeekDigits<S, `${L}${C}+`>, `${L}${C}+${PeekDigits<S, `${L}${C}+`>}`>
      : S extends `${L}${C}${Digit}${any}` ? ParseExponent<Result, PeekDigits<S, `${L}${C}`>, `${L}${C}${PeekDigits<S, `${L}${C}`>}`>
      : [L, Num<Result>]
    : [L, Num<Result>]
  : [L, Num<Result>]  // expecting token

/**
 * Parses the exponent part of a JSON number, handling both positive and negative exponents.
 * This ensures that numbers with exponents are correctly interpreted and validated.
 */
type ParseExponent<Mantissa extends string, Exponent extends string, L extends string = ''>
  = Exponent extends `0` | '-0' ? [L, Num<Mantissa>]
  : Exponent extends `-${infer N extends bigint}` ? [L, Num<`${Mantissa}e-${N}`>]
  : Exponent extends `${infer N extends bigint}` ? [L, Num<`${Mantissa}e+${N}`>]
  : [L, Num<Mantissa>]

/**
 * Advances the parser by skipping whitespace characters.
 */
type Peek<S extends string, L extends string = ''>
  = S extends `${L}${infer C}${any}` ? C extends ' ' | '\t' | '\n' ? Peek<S, `${L}${C}`> : [L, C] : []

/**
 * Extracts consecutive digits from a string for parsing JSON numbers.
 */
type PeekDigits<S extends string, L extends string = '', Result extends string = ''>
  = S extends `${L}${infer C}${any}`
    ? C extends Digit ? PeekDigits<S, `${L}${C}`, `${Result}${C}`> : Result
  : Result

/**
 * Trims the starting part of a string up to the specified start sequence.
 */
type TrimStart<S extends string, Start extends string> = S extends `${Start}${infer End}` ? End : ''

/**
 * Converts a string representation of a number to a TypeScript number type.
 */
type Num<S extends string> = S extends `${infer N extends number}` ? N : never

/**
 * Defines the valid digits for parsing JSON numbers.
 */
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/**
 * Defines the valid hexadecimal characters for parsing Unicode escape sequences in JSON strings.
 */
type Hex = Digit | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
