import type { Peek } from './Peek';
import type { ParseValue } from './JsonTypes';

/**
 * Parses a JSON array, ensuring all elements are valid.
 */
export type ParseArray<S extends string, L extends string = '[', Result extends unknown[] = []>
  = Peek<S, L> extends [infer L extends string, ']']
    ? Result extends []
      ? [`${L}]`, []] : []
    : ParseValue<S, L> extends [infer L extends string, infer V]
      ? Peek<S, L> extends [infer L extends string, ','] ? ParseArray<S, `${L},`, [...Result, V]>
      : Peek<S, L> extends [infer L extends string, ']'] ? [`${L}]`, [...Result, V]]
      : [] // expecting , or ]
  : []; // expecting ]
