import type { Unicode } from './Unicode'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<Unicode extends `${''}${infer C}${any}` ? C : never, '\u0000'>>
type _1b = Expect<Equal<Unicode extends `${`${any}`}${infer C}${any}` ? C : never, '\u0001'>>
type _1c = Expect<Equal<Unicode extends `${`${any}${any}`}${infer C}${any}` ? C : never, '\u0002'>>
type _1d = Expect<Equal<Unicode extends `${`${any}${any}${any}`}${infer C}${any}` ? C : never, '\u0003'>>
