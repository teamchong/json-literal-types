---
"json-literal-types": patch
---

- Fix incorrect inference for `1e1`, `1E1`, `1E+1`, and `1E-1`, which were defaulting to `number`.
- Ensure `1e1` is correctly inferred within the range of `1e21` to `1e-7`.
- Normalize numbers to non-scientific notation, check the range, and convert back to scientific notation if needed.