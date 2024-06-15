import type { JsonValue, JsonString, JsonNumber, JsonBoolean, JsonNull, JsonObject, JsonArray, Parse } from './JsonTypes'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

// @ts-expect-error expect json
type _1a = Expect<Equal<JsonValue<`abc`>, 'abc'>>
type _1c = Expect<Equal<JsonValue<`"Hello\\nWorld\\u838a"`>, `"Hello\\nWorld\\u838a"`>>
type _1d = Expect<Equal<JsonValue<`123`>, `123`>>
type _1e = Expect<Equal<JsonValue<`true`>, `true`>>
type _1f = Expect<Equal<JsonValue<`null`>, `null`>>
type _1g = Expect<Equal<JsonValue<`{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}`>, '{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}'>>
type _1h = Expect<Equal<JsonValue<`[1,"Hello\\nWorld\\u838a",true,false,null]`>, '[1,"Hello\\nWorld\\u838a",true,false,null]'>>

// @ts-expect-error expect string
type _2a = Expect<Equal<JsonString<`{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}`>, '{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}'>>
type _2b = Expect<Equal<JsonString<`"Hello\\nWorld\\u838a"`>, '"Hello\\nWorld\\u838a"'>>

// @ts-expect-error expect number
type _3a = Expect<Equal<JsonNumber<`"Hello\\nWorld\\u838a"`>, '"Hello\\nWorld\\u838a"'>>
type _3b = Expect<Equal<JsonNumber<`12`>, '12'>>
type _3c = Expect<Equal<JsonNumber<`12e1`>, '12e1'>>
type _3d = Expect<Equal<JsonNumber<`-12.1e1`>, '-12.1e1'>>

// @ts-expect-error expect boolean
type _4a = Expect<Equal<JsonBoolean<`"Hello\\nWorld\\u838a"`>, '"Hello\\nWorld\\u838a"'>>
type _4b = Expect<Equal<JsonBoolean<`true`>, 'true'>>
type _4c = Expect<Equal<JsonBoolean<`false`>, 'false'>>

// @ts-expect-error expect null
type _5a = Expect<Equal<JsonNull<`"Hello\\nWorld\\u838a"`>, '"Hello\\nWorld\\u838a"'>>
type _5b = Expect<Equal<JsonNull<`null`>, 'null'>>

// @ts-expect-error expect null
type _6a = Expect<Equal<JsonObject<`12`>, '12'>>
type _6b = Expect<Equal<JsonObject<`{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}`>, '{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}'>>

// @ts-expect-error expect null
type _7a = Expect<Equal<JsonArray<`12`>, '12'>>
type _7b = Expect<Equal<JsonArray<`[1,"Hello\\nWorld\\u838a",true,false,null]`>, '[1,"Hello\\nWorld\\u838a",true,false,null]'>>

// @ts-expect-error expect null
type _8a = Expect<Equal<Parse<`"Hello\\nWorld\\u838a"`>, never>>
type _8b = Expect<Equal<Parse<`"Hello\\nWorld\\u838a"`>, 'Hello\nWorld莊'>>
type _8c = Expect<Equal<Parse<`abc`>, never>>
