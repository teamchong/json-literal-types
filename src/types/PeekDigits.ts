import type { Digit } from "./Digit";

/**
 * Extracts consecutive digits from a string for parsing JSON numbers.
 */
export type PeekDigits<S extends string, L extends string = '', Result extends string = ''>
  = S extends `${L}${infer C}${any}`
    ? C extends Digit ? PeekDigits<S, `${L}${C}`, `${Result}${C}`> : Result
  : Result
