import type { ParseString } from './ParseString'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<ParseString<'"1"'>, ['"1"', '1']>>
type _1b = Expect<Equal<ParseString<'"Hello\\nWorld\\u838a"'>, ['"Hello\\nWorld\\u838a"',"Hello\nWorld莊"]>>
