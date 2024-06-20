import type { Digit } from "./Digit"
import type { MinusOne } from "./MinusOne"
import type { PlusOne } from "./PlusOne"
import type { TrimStart } from "./TrimStart"

/**
 * Converts a string representation of a number to a TypeScript number type.
 */
export type ToNumber<S extends string>
  = S extends `-${infer M}e+${infer E}` ? `-${ParseExponent<NormalizeExponent<M, E>>}` extends `${infer N extends number}` ? N : never
  : S extends `${infer M}e+${infer E}` ? ParseExponent<NormalizeExponent<M, E>> extends `${infer N extends number}` ? N : never
  : S extends `-${infer M}e-${infer E}` ? `-${ParseExponent<NormalizeExponent<M, `-${E}`>>}` extends `${infer N extends number}` ? N : never
  : S extends `${infer M}e-${infer E}` ? ParseExponent<NormalizeExponent<M, `-${E}`>> extends `${infer N extends number}` ? N : never
  : ParseExponent<NormalizeExponent<S, `0`>> extends `${infer N extends number}` ? N : never

// Base normalization
type NormalizeExponent<Mantissa extends string, Exponent extends string>
  = Exponent extends `0` | '-0' ? Mantissa extends `${infer I}.${infer F}0` ? NormalizeExponent<`${I}.${F}`, Exponent> : Mantissa
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

/**
 * Parses the exponent part of a JSON number, handling both positive and negative exponents.
 * This ensures that numbers with exponents are correctly interpreted and validated.
 */
type ParseExponent<Normalized extends string>
  = Normalized extends `0.000000${any}` ? NegSciForm<Normalized> extends infer SciForm extends string ? SciForm : never
  : Normalized extends `${any}.${any}`
    ? Normalized extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}.${any}`
      ? PosSciForm<Normalized> extends infer SciForm extends string ? SciForm
      : never
    : Normalized
  : Normalized extends `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`
    ? PosSciForm<Normalized> extends infer SciForm extends string ? SciForm
    : never
  : Normalized

// to Negative Scientific Notation
type NegSciForm<Mantissa extends string, Exponent extends string = '0'>
  = [Mantissa & `0.${any}`] extends [never] ? Exponent extends '0' ? Mantissa : `${Mantissa}e-${Exponent}`
  : Mantissa extends `0.${Digit}` ? NegSciForm<TrimStart<Mantissa, '0.'>, PlusOne<Exponent>>
  : Mantissa extends `0.${infer F1}${infer F2}` ? NegSciForm<`${F1}.${F2}`, PlusOne<Exponent>>
  : Mantissa

// to Possible Scientific Notation
type PosSciForm<Mantissa extends string, Exponent extends string = '0'>
  = Mantissa extends Digit | `${Digit}.${any}` ? Exponent extends '0' ? Mantissa : `${Mantissa}e+${Exponent}`
  : Mantissa extends `${infer I}.${infer F}` ? PosSciForm<I extends `${infer I1}${Digit}` ? `${I1}.${TrimStart<I, I1>}${F}` : never, PlusOne<Exponent>>
  : Mantissa extends `${infer I}0` ? PosSciForm<I, PlusOne<Exponent>>
  : Mantissa extends `${infer I}${Digit}` ? PosSciForm<`${I}.${TrimStart<Mantissa, I>}`, PlusOne<Exponent>>
  : Mantissa