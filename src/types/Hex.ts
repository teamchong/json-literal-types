import type { Digit } from "./Digit";

/**
 * Defines the valid hexadecimal characters for parsing Unicode escape sequences in JSON strings.
 */
export type Hex = Digit | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
