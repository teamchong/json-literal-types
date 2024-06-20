/**
 * Increments a bigint by one. This is used for parsing the exponent part of a JSON number.
 */
export type PlusOne<N extends string, Result extends string = ''>
  = N extends `${infer L}9`
    ? L extends '' ? `10${Result}`
    : PlusOne<L, `0${Result}`>
  : N extends `${infer L}8` ? `${L}9${Result}`
  : N extends `${infer L}7` ? `${L}8${Result}`
  : N extends `${infer L}6` ? `${L}7${Result}`
  : N extends `${infer L}5` ? `${L}6${Result}`
  : N extends `${infer L}4` ? `${L}5${Result}`
  : N extends `${infer L}3` ? `${L}4${Result}`
  : N extends `${infer L}2` ? `${L}3${Result}`
  : N extends `${infer L}1` ? `${L}2${Result}`
  : N extends `${infer L}0` ? `${L}1${Result}`
  : never;
