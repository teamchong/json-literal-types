import type { Digit } from './Digit';
import type { PeekDigits } from './PeekDigits';
import type { ToNumber } from './ToNumber';

/**
 * Parses a JSON number, handling decimal points and exponents.
 */
export type ParseNumber<S extends string, L extends string = '', Result extends string = ''>
  = S extends `${L}${infer C}${any}`
    ? C extends Digit ? ParseNumber<S, `${L}${PeekDigits<S, L>}`, `${Result}${PeekDigits<S, L>}`>
    : C extends '.'
      ? Result extends `${any}.${any}` ? []
      : ParseNumber<S, `${L}.`, `${Result}.`>
    : C extends 'e' | 'E'
      ? S extends `${L}${C}-${Digit}${any}` ? [`${L}${C}-${PeekDigits<S, `${L}${C}-`>}`, ToNumber<`${Result}e-${PeekDigits<S, `${L}${C}-`>}`>]
      : S extends `${L}${C}+${Digit}${any}` ? [`${L}${C}+${PeekDigits<S, `${L}${C}+`>}`, ToNumber<`${Result}e+${PeekDigits<S, `${L}${C}+`>}`>]
      : S extends `${L}${C}${Digit}${any}` ? [`${L}${C}${PeekDigits<S, `${L}${C}`>}`, ToNumber<`${Result}e+${PeekDigits<S, `${L}${C}`>}`>]
      : [L, ToNumber<Result>]
    : C extends '-'
      ? Result extends '' ? ParseNumber<S, `${L}-`, '-'>
      : []
    : [L, ToNumber<Result>]
  : [L, ToNumber<Result>] // expecting token
