import type { ParseNumber } from './ParseNumber'

type Expect<T extends true> = T
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

type _1a = Expect<Equal<ParseNumber<`12`>, [`12`, 12]>>
type _1b = Expect<Equal<ParseNumber<`-12`>, [`-12`, -12]>>
type _1c = Expect<Equal<ParseNumber<`12e1`>, [`12e1`, 12e1]>>
type _1d = Expect<Equal<ParseNumber<`-12.1e1`>, [`-12.1e1`, -121]>>
type _1e = Expect<Equal<ParseNumber<`2e21`>, [`2e21`, 2e21]>>
type _1f = Expect<Equal<ParseNumber<`-2e21`>, [`-2e21`, -2e21]>>
type _1g = Expect<Equal<ParseNumber<`1.1e-6`>, [`1.1e-6`, 0.0000011]>>
type _1h = Expect<Equal<ParseNumber<`-1.1e-6`>, [`-1.1e-6`, -0.0000011]>>
type _1i = Expect<Equal<ParseNumber<`1e-7`>, [`1e-7`, 1e-7]>>
type _1j = Expect<Equal<ParseNumber<`-1e-7`>, [`-1e-7`, -1e-7]>>
type _1k = Expect<Equal<ParseNumber<`1e-6`>, [`1e-6`, 0.000001]>>
type _1l = Expect<Equal<ParseNumber<`-1e-6`>, [`-1e-6`, -0.000001]>>
type _1m = Expect<Equal<ParseNumber<`1.1e-7`>, [`1.1e-7`, 1.1e-7]>>
type _1n = Expect<Equal<ParseNumber<`-1.1e-7`>, [`-1.1e-7`, -1.1e-7]>>
type _1o = Expect<Equal<ParseNumber<`1.1e+21`>, [`1.1e+21`, 1.1e+21]>>
type _1p = Expect<Equal<ParseNumber<`-1.1e+21`>, [`-1.1e+21`, -1.1e+21]>>
type _1q = Expect<Equal<ParseNumber<`1.1e+20`>, [`1.1e+20`, 110000000000000000000]>>
type _1r = Expect<Equal<ParseNumber<`-1.1e+20`>, [`-1.1e+20`, -110000000000000000000]>>
type _1s = Expect<Equal<ParseNumber<`1.23456e-21`>, [`1.23456e-21`, 1.23456e-21]>>
type _1t = Expect<Equal<ParseNumber<`-1.23456e-21`>, [`-1.23456e-21`, -1.23456e-21]>>
