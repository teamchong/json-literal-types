import type { ToNumber } from './ToNumber'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<ToNumber<`12`>, 12>>
type _1b = Expect<Equal<ToNumber<`-12`>, -12>>
type _1c = Expect<Equal<ToNumber<`12e+1`>, 120>>
type _1d = Expect<Equal<ToNumber<`-12.1e+1`>, -121>>
type _1e = Expect<Equal<ToNumber<`2e+21`>, 2e21>>
type _1f = Expect<Equal<ToNumber<`-2e+21`>, -2e21>>
type _1g = Expect<Equal<ToNumber<`1.1e-6`>, 0.0000011>>
type _1h = Expect<Equal<ToNumber<`-1.1e-6`>, -0.0000011>>
type _1i = Expect<Equal<ToNumber<`1e-7`>, 1e-7>>
type _1j = Expect<Equal<ToNumber<`-1e-7`>, -1e-7>>
type _1k = Expect<Equal<ToNumber<`1e-6`>, 0.000001>>
type _1l = Expect<Equal<ToNumber<`-1e-6`>, -0.000001>>
type _1m = Expect<Equal<ToNumber<`1.1e-7`>, 1.1e-7>>
type _1n = Expect<Equal<ToNumber<`-1.1e-7`>, -1.1e-7>>
type _1o = Expect<Equal<ToNumber<`1.1e+21`>, 1.1e+21>>
type _1p = Expect<Equal<ToNumber<`-1.1e+21`>, -1.1e+21>>
type _1q = Expect<Equal<ToNumber<`1.1e+20`>, 110000000000000000000>>
type _1r = Expect<Equal<ToNumber<`-1.1e+20`>, -110000000000000000000>>
type _1s = Expect<Equal<ToNumber<`1.23456e-21`>, 1.23456e-21>>
type _1t = Expect<Equal<ToNumber<`-1.23456e-21`>, -1.23456e-21>>
