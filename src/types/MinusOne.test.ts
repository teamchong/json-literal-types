import type { MinusOne } from './MinusOne'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<MinusOne<'1'>, '0'>>
type _1b = Expect<Equal<MinusOne<'0'>, never>>
type _1c = Expect<Equal<MinusOne<'10'>, '9'>>
type _1d = Expect<Equal<MinusOne<'11', ''>, '10'>>
type _1e = Expect<Equal<MinusOne<'1000000'>, '999999'>>
