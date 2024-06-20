/**
 * Advances the parser by skipping whitespace characters.
 */
export type Peek<S extends string, L extends string = ''>
    = S extends `${L}${infer C}${any}`
        ? C extends ' ' | '\t' | '\n' ? Peek<S, `${L}${C}`> : [L, C]
    : [];
