import type { ParseInferred, InferJsonType } from './InferredJsonTypes'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

// @ts-expect-error expect null
type _1a = Expect<Equal<ParseInferred<`"Hello\\nWorld\\u838a"`>, never>>
type _1b = Expect<Equal<ParseInferred<`1`>, number>>
type _1c = Expect<Equal<ParseInferred<`{"key":"value"}`>, {key:string}>>
type _1d = Expect<Equal<ParseInferred<`["1","2"]`>, string[]>>
type _1e = Expect<Equal<ParseInferred<`[1,2]`>, number[]>>
type _1f = Expect<Equal<ParseInferred<`[{"key":"value"}]`>, {"key":string}[]>>
type _1g = Expect<Equal<ParseInferred<`{"key":["value"]}`>, {"key":string[]}>>
type _1h = Expect<Equal<ParseInferred<`["1",2]`>, (string | number)[]>>
type _1i = Expect<Equal<ParseInferred<`abc`>, never>>

// @ts-expect-error expect null
type _2a = Expect<Equal<InferJsonType<`"Hello\\nWorld\\u838a"`>, never>>
type _2b = Expect<Equal<InferJsonType<`1`>, string>>
type _2c = Expect<Equal<InferJsonType<{"key":"value"}>, {key:string}>>
type _2d = Expect<Equal<InferJsonType<["1","2"]>, string[]>>
type _2e = Expect<Equal<InferJsonType<[1,2]>, number[]>>
type _2f = Expect<Equal<InferJsonType<[{"key":"value"}]>, {"key":string}[]>>
type _2g = Expect<Equal<InferJsonType<{"key":["value"]}>, {"key":string[]}>>
type _2h = Expect<Equal<InferJsonType<["1",2]>, (string | number)[]>>
