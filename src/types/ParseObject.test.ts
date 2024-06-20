import type { ParseObject } from './ParseObject'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<ParseObject<'{}'>, ['{}', {}]>>
type _1b = Expect<Equal<ParseObject<'{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}'>, ['{\"key\":[1,\"Hello\\nWorld\\u838a\",true,false,null]}', {key:[1,"Hello\nWorld莊",true,false,null]}]>>
