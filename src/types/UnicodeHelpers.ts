import type { Unicode } from './Unicode'

/**
 * Type-level utility to extract a Unicode character from a given escape sequence.
 * This type is used to match escape sequences like \u1234 to their corresponding character.
 */
export type ExtractUnicodeCharacter<H extends string> = Unicode extends `${PadStartUnicode<H>}${infer C}${any}` ? C : never

/**
 * Type-level utility to pad the start of a string.
 * This helps in matching the correct escape sequence within the Unicode string.
 */
export type PadStartUnicode<H extends string, Result extends string = ''>
  = H extends `${infer F extends keyof PadStartMapping}${infer R}` ? PadStartUnicode<R, PadStartMapping<Result>[F]>
  : Result

/**
 * Mapping of padding values to assist in the extraction of Unicode characters.
 */
export type PadStartMapping<H extends string = ''> = {
  '0': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}`,
  '1': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}`,
  '2': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}`,
  '3': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}`,
  '4': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}`,
  '5': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}`,
  '6': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}`,
  '7': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}`,
  '8': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}`,
  '9': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
  'a': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
  'b': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
  'c': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
  'd': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
  'e': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
  'f': `${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${H}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`,
}
