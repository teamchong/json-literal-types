import type { JsonValue, JsonString, JsonNumber, JsonBoolean, JsonNull, JsonObject, JsonArray, Parse } from "./types/JsonTypes"

export type { JsonValue, JsonString, JsonNumber, JsonBoolean, JsonNull, JsonObject, JsonArray, Parse }

export function parseAs<const S extends string>(jsonString: JsonValue<S>): Parse<S> {
    return JSON.parse(jsonString)
}

export function parseAsString<const S extends string>(jsonString: JsonString<S>): Parse<S> {
    return JSON.parse(jsonString)
}

export function parseAsNumber<const S extends string>(jsonString: JsonNumber<S>): Parse<S> {
    return JSON.parse(jsonString)
}

export function parseAsBoolean<const S extends string>(jsonString: JsonBoolean<S>): Parse<S> {
    return JSON.parse(jsonString)
}

export function parseAsNull<const S extends string>(jsonString: JsonNull<S>): Parse<S> {
    return JSON.parse(jsonString)
}

export function parseAsObject<const S extends string>(jsonString: JsonObject<S>): Parse<S> extends any[] ? never : Parse<S> {
    return JSON.parse(jsonString)
}

export function parseAsArray<const S extends string>(jsonString: JsonArray<S>): Parse<S> {
    return JSON.parse(jsonString)
}

import type { ParseInferred, InferJsonType } from "./types/InferredJsonTypes"

export type { ParseInferred, InferJsonType }

export function parseInferredAs<const S extends string>(jsonString: JsonValue<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}

export function parseInferredAsString<const S extends string>(jsonString: JsonString<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}

export function parseInferredAsNumber<const S extends string>(jsonString: JsonNumber<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}

export function parseInferredAsBoolean<const S extends string>(jsonString: JsonBoolean<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}

export function parseInferredAsNull<const S extends string>(jsonString: JsonNull<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}

export function parseInferredAsObject<const S extends string>(jsonString: JsonObject<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}

export function parseInferredAsArray<const S extends string>(jsonString: JsonArray<S>): ParseInferred<S> {
    return JSON.parse(jsonString)
}
