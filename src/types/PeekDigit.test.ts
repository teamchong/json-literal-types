import type { PeekDigits } from './PeekDigits'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<PeekDigits<'1'>, '1'>>
type _1b = Expect<Equal<PeekDigits<'1234a'>, '1234'>>
type _1c = Expect<Equal<PeekDigits<'a'>, ''>>
type _1d = Expect<Equal<PeekDigits<' 1234'>, ''>>
