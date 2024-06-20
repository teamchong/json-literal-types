import type { Peek } from './Peek'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<Peek<'1'>, ['', '1']>>
type _1b = Expect<Equal<Peek<' 1'>, [' ', '1']>>
type _1c = Expect<Equal<Peek<'\n10\n', ''>, ['\n', '1']>>
type _1d = Expect<Equal<Peek<'\n\t 10\n', ''>, ['\n\t ', '1']>>
