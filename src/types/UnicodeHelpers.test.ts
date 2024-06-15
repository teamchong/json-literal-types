import type { ExtractUnicodeCharacter, PadStartUnicode, PadStartMapping } from './UnicodeHelpers'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<ExtractUnicodeCharacter<`000a`>, '\n'>>
type _1b = Expect<Equal<ExtractUnicodeCharacter<`838a`>, '莊'>>

type _2a = Expect<Equal<PadStartUnicode<`0001`>, `${any}`>>
type _2b = Expect<Equal<PadStartUnicode<`0010`>, `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`>>

type _3a = Expect<Equal<PadStartMapping[`1`], `${any}`>>
type _3b = Expect<Equal<PadStartMapping<`${any}`>[1], `${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}${any}`>>
