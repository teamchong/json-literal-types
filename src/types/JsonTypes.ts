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
      ? S extends `${L}${C}-${Digit}${any}` ? [`${L}${C}-${PeekDigits<S, `${L}${C}-`>}`, ParseExponent<Result, `-${PeekDigits<S, `${L}${C}-`>}`>]
      : S extends `${L}${C}+${Digit}${any}` ? [`${L}${C}+${PeekDigits<S, `${L}${C}+`>}`, ParseExponent<Result, PeekDigits<S, `${L}${C}+`>>]
      : S extends `${L}${C}${Digit}${any}` ? [`${L}${C}${PeekDigits<S, `${L}${C}`>}`, ParseExponent<Result, PeekDigits<S, `${L}${C}`>>]
      : [L, ParseExponent<Result, '0'>]
    : [L, ParseExponent<Result, '0'>]
  : [L, ParseExponent<Result, '0'>]  // expecting token

// Base normalization
type NormalizeExponent<Mantissa extends string, Exponent extends string>
  = Exponent extends `0` | '-0'
    ? Mantissa extends `${infer I}.${infer F}0` ? NormalizeExponent<`${I}.${F}`, Exponent>
    : Mantissa
  : Exponent extends `-${infer E extends bigint}`
    ? NormalizeExponent<
        Mantissa extends `${infer I}.${infer F}`
          ? I extends Digit ? `0.${I}${F}`
          : I extends `${infer I1}${Digit}` ? `${I1}.${TrimStart<I, I1>}${F}`
          : Mantissa
        : Mantissa extends Digit ? `0.${Mantissa}`
        : Mantissa extends `${infer I}0` ? I
        : Mantissa extends `${infer I}${Digit}` ? `${I}.${TrimStart<Mantissa, I>}`
        : Mantissa
        , `-${MinusOne<`${E}`>}`>
  : NormalizeExponent<
      Mantissa extends `${infer I}.${infer F}`
        ? F extends Digit ? `${I}${F}`
        : F extends `${infer F1}${infer F2}` ? `${I}${F1}.${F2}`
        : Mantissa
      : `${Mantissa}0`
      , MinusOne<Exponent>>

// to Negative Scientific Notation
type NegSciForm<Mantissa extends string, Exponent extends string = '0'>
  = [Mantissa & `0.${any}`] extends [never]
    ? Exponent extends '0' ? Mantissa : `${Mantissa}e-${Exponent}`
  : Mantissa extends `0.${Digit}` ? NegSciForm<TrimStart<Mantissa, '0.'>, PlusOne<Exponent>>
  : Mantissa extends `0.${infer F1}${infer F2}` ? NegSciForm<`${F1}.${F2}`, PlusOne<Exponent>>
  : Mantissa

// to Possible Scientific Notation
type PosSciForm<Mantissa extends string, Exponent extends string = '0'>
  = Mantissa extends Digit | `${Digit}.${any}`
    ? Exponent extends '0' ? Mantissa : `${Mantissa}e+${Exponent}`
  : Mantissa extends `${infer I}.${infer F}`
    ? PosSciForm<I extends `${infer I1}${Digit}` ? `${I1}.${TrimStart<I, I1>}${F}` : never, PlusOne<Exponent>>
  : Mantissa extends `${infer I}0` ? PosSciForm<I, PlusOne<Exponent>>
  : Mantissa extends `${infer I}${Digit}` ? PosSciForm<`${I}.${TrimStart<Mantissa, I>}`, PlusOne<Exponent>>
  : Mantissa

/**
 * Parses the exponent part of a JSON number, handling both positive and negative exponents.
 * This ensures that numbers with exponents are correctly interpreted and validated.
 */
type ParseExponent<Mantissa extends string, Exponent extends string, Normalized extends string = NormalizeExponent<Mantissa, Exponent>>
  = Normalized extends `0.000000${any}`
    ? NegSciForm<Normalized> extends infer N extends string ? Num<N> : never
  : Normalized extends `${any}.${any}`
    ? Normalized extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}.${any}`
      ? PosSciForm<Normalized> extends infer N extends string ? Num<N> : never
    : Num<Normalized>
  : Normalized extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`
    ? PosSciForm<Normalized> extends infer N extends string ? Num<N> : never
  : Num<Normalized>

/**
 * Increments a bigint by one. This is used for parsing the exponent part of a JSON number.
 */
type PlusOne<N extends string, Result extends string = ''>
  = N extends `${infer L}9` ? L extends '' ? `10${Result}` : PlusOne<L, `0${Result}`>
  : N extends `${infer L}8` ? `${L}9${Result}`
  : N extends `${infer L}7` ? `${L}8${Result}`
  : N extends `${infer L}6` ? `${L}7${Result}`
  : N extends `${infer L}5` ? `${L}6${Result}`
  : N extends `${infer L}4` ? `${L}5${Result}`
  : N extends `${infer L}3` ? `${L}4${Result}`
  : N extends `${infer L}2` ? `${L}3${Result}`
  : N extends `${infer L}1` ? `${L}2${Result}`
  : N extends `${infer L}0` ? `${L}1${Result}`
  : never

/**
 * Decrements a bigint by one. This is used for parsing the exponent part of a JSON number.
 */
type MinusOne<N extends string, Result extends string = ''>
  = N extends `${infer L}0` ? L extends '1' ? `9${Result}` : MinusOne<L, `9${Result}`>
  : N extends `${infer L}1` ? `${L}0${Result}`
  : N extends `${infer L}2` ? `${L}1${Result}`
  : N extends `${infer L}3` ? `${L}2${Result}`
  : N extends `${infer L}4` ? `${L}3${Result}`
  : N extends `${infer L}5` ? `${L}4${Result}`
  : N extends `${infer L}6` ? `${L}5${Result}`
  : N extends `${infer L}7` ? `${L}6${Result}`
  : N extends `${infer L}8` ? `${L}7${Result}`
  : N extends `${infer L}9` ? `${L}8${Result}`
  : never

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
type Num<S extends string> = S extends `${infer N extends number}` ? number extends N ? never : N : never

/**
 * Defines the valid digits for parsing JSON numbers.
 */
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/**
 * Defines the valid hexadecimal characters for parsing Unicode escape sequences in JSON strings.
 */
type Hex = Digit | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
