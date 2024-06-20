import type { TrimStart } from './TrimStart'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<TrimStart<'ab', 'a'>, 'b'>>
type _1b = Expect<Equal<TrimStart<'', 'a'>, ''>>
type _1c = Expect<Equal<TrimStart<'ab', ''>, 'ab'>>
type _1d = Expect<Equal<TrimStart<'abcd', 'ab'>, 'cd'>>
