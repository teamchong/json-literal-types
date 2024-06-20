/**
 * Trims the starting part of a string up to the specified start sequence.
 */
export type TrimStart<S extends string, Start extends string>
    = S extends `${Start}${infer End}` ? End
    : '';
