# json-literal-types

## 1.0.5

### Patch Changes

- 8a27b19: Updated the Playground link to use [StackBlitz](https://stackblitz.com/github/teamchong/json-literal-types?file=src%2Fplayground.ts) for improved TypeScript error visibility.

## 1.0.4

### Patch Changes

- 2998aa7: fix 1e6 normalize to .1

## 1.0.3

### Patch Changes

- 2bf389e: - Fix incorrect inference for `1e1`, `1E1`, `1E+1`, and `1E-1`, which were defaulting to `number`.
  - Ensure `1e1` is correctly inferred within the range of `1e21` to `1e-7`.
  - Normalize numbers to non-scientific notation, check the range, and convert back to scientific notation if needed.

## 1.0.2

### Patch Changes

- ad9794b: fix: allow parsing 1e1
- 8f971d7: fix: number value `2e21` cannot be parsed

## 1.0.1

### Patch Changes

- 751ca2d: ParseNumber will return number instead of never when overflow
