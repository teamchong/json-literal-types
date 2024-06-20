/**
 * Decrements a bigint by one. This is used for parsing the exponent part of a JSON number.
 */
export type MinusOne<N extends string, Result extends string = ''>
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