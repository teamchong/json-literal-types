import type { Peek } from './Peek';
import type { ParseValue } from './JsonTypes';
import type { ParseString } from './ParseString';

/**
 * Parses a JSON object, ensuring the keys and values are valid.
 */
export type ParseObject<S extends string, L extends string = '{', Result extends object = {}, C extends string[] = Peek<S, L>>
  = C extends [infer L extends string, '}']
    ? Result extends {} ? [`${L}}`, {}]
    : []
  : ParseString<S, `${Peek<S, L>[0]}"`> extends [infer L extends string, infer P extends string]
    ? P extends keyof Result ? [] // duplicated property name
    : ParseValue<S, `${Peek<S, L>[0]}:`> extends [infer L extends string, infer V]
      ? Peek<S, L> extends infer C extends string[]
        ? C extends [infer L extends string, ','] ? ParseObject<S, `${L},`, {
            [K in keyof Result | P]: K extends keyof Result ? Result[K] : V;
          }>
        : C extends [infer L extends string, '}'] ? [`${L}}`, {
            [K in keyof Result | P]: K extends keyof Result ? Result[K] : V;
          }]
        : [] // expecting , or }
      : [] // expecting , or }
    : [] // expecting Value
  : []; // expecting Name
