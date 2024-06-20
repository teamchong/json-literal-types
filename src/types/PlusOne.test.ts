import type { PlusOne } from './PlusOne'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<PlusOne<'1'>, '2'>>
type _1b = Expect<Equal<PlusOne<'9'>, '10'>>
type _1c = Expect<Equal<PlusOne<'10', ''>, '11'>>
type _1d = Expect<Equal<PlusOne<'999999'>, '1000000'>>
