import type { Hex } from './Hex';
import type { ExtractUnicodeCharacter } from './UnicodeHelpers';

/**
 * Parses a JSON string value, handling escape sequences and ensuring the string is valid.
 */
export type ParseString<S extends string, L extends string = '"', Result extends string = ''>
  = S extends `${L}"${any}` ? [`${L}"`, Result]
  : S extends `${L}${'\n' | '\r' | '\t'}${any}` ? [] // those chars must be escape
  : S extends `${L}\\\\${any}` ? ParseString<S, `${L}\\\\`, `${Result}\\`>
  : S extends `${L}\\"${any}` ? ParseString<S, `${L}\\"`, `${Result}\"`>
  : S extends `${L}\\b${any}` ? ParseString<S, `${L}\\b`, `${Result}\b`>
  : S extends `${L}\\f${any}` ? ParseString<S, `${L}\\f`, `${Result}\f`>
  : S extends `${L}\\n${any}` ? ParseString<S, `${L}\\n`, `${Result}\n`>
  : S extends `${L}\\r${any}` ? ParseString<S, `${L}\\r`, `${Result}\r`>
  : S extends `${L}\\t${any}` ? ParseString<S, `${L}\\t`, `${Result}\t`>
  : S extends `${L}\\u${infer E}${infer F}${infer G}${infer H}${any}`
    ? E | F | G | H extends Hex ? ParseString<S, `${L}\\u${E}${F}${G}${H}`, `${Result}${ExtractUnicodeCharacter<`${E}${F}${G}${H}`>}`>
    : [] // expecting 4 hex chars
  : S extends `${L}\\${any}` ? [] // unexpected escape sequence
  : S extends `${L}${infer C}${any}` ? ParseString<S, `${L}${C}`, `${Result}${C}`> : []; // expecting token
