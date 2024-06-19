# json-literal-types

`json-literal-types` is a TypeScript library for validating and parsing JSON string literals at compile-time. This library ensures that JSON strings are correctly typed and parsed, providing robust type safety for JSON data in your TypeScript projects.

## Installation

Installation is done using the `npm install command`:

```bash
npm i json-literal-types
```

## Usage

Here are some examples of how to use the `json-literal-types` package in your projects.

### Importing and Using Types

```typescript
import { 
  parseAs, parseAsString, parseAsNumber, parseAsBoolean, parseAsNull, 
  parseAsObject, parseAsArray, 
  parseInferredAs, parseInferredAsString, parseInferredAsNumber, 
  parseInferredAsBoolean, parseInferredAsNull, parseInferredAsObject, parseInferredAsArray 
} from './index';

// Example usage for exact parsing functions
const jsonString = '{"host":"localhost","port":8080}';

const parsedObject = parseAs(jsonString);
console.log(parsedObject); // { host: 'localhost', port: 8080 }

const parsedString = parseAsString('"hello\\nworld\\u838a"');
console.log(parsedString); // "hello\nworld莊"

const parsedNumber = parseAsNumber('42');
console.log(parsedNumber); // 42

const parsedBoolean = parseAsBoolean('true');
console.log(parsedBoolean); // true

const parsedNull = parseAsNull('null');
console.log(parsedNull); // null

const parsedObject2 = parseAsObject('{"host":"localhost","port":8080}');
console.log(parsedObject2); // { host: 'localhost', port: 8080 }

const parsedArray = parseAsArray('[{"host":"localhost","port":8080}]');
console.log(parsedArray); // [{ host: 'localhost', port: 8080 }]

// Example usage for inferred parsing functions
const inferredJsonString = '{"host":"localhost","port":8080}';

const inferredParsedObject = parseInferredAs(inferredJsonString);
console.log(inferredParsedObject); // { host: string, port: number }

const inferredParsedString = parseInferredAsString('"hello\\nworld\\u838a"');
console.log(inferredParsedString); // string

const inferredParsedNumber = parseInferredAsNumber('42');
console.log(inferredParsedNumber); // number

const inferredParsedBoolean = parseInferredAsBoolean('true');
console.log(inferredParsedBoolean); // boolean

const inferredParsedNull = parseInferredAsNull('null');
console.log(inferredParsedNull); // null

const inferredParsedObject2 = parseInferredAsObject('{"host":"localhost","port":8080}');
console.log(inferredParsedObject2); // { host: string, port: number }

const inferredParsedArray = parseInferredAsArray('[{"host":"localhost","port":8080}]');
console.log(inferredParsedArray); // [{ host: string, port: number }]
```

### Playground

You can try out the examples in the [playground.ts](https://stackblitz.com/github/teamchong/json-literal-types?file=src%2Fplayground.ts) file to see how to use the different functions provided by this library.


### API

#### Default Functions

- **parseAs**: Parses a JSON string and infers its type.
- **parseAsString**: Parses a JSON string and infers its type, ensuring the result is a string.
- **parseAsNumber**: Parses a JSON string and infers its type, ensuring the result is a number.
- **parseAsBoolean**: Parses a JSON string and infers its type, ensuring the result is a boolean.
- **parseAsNull**: Parses a JSON string and infers its type, ensuring the result is null.
- **parseAsObject**: Parses a JSON string and infers its type, ensuring the result is an object.
- **parseAsArray**: Parses a JSON string and infers its type, ensuring the result is an array.

#### Inferred Functions

- **parseInferredAs**: Parses a JSON string and infers its type more loosely, converting specific JSON values to general TypeScript types.
- **parseInferredAsString**: Parses a JSON string and infers its type more loosely, ensuring the result is a string.
- **parseInferredAsNumber**: Parses a JSON string and infers its type more loosely, ensuring the result is a number.
- **parseInferredAsBoolean**: Parses a JSON string and infers its type more loosely, ensuring the result is a boolean.
- **parseInferredAsNull**: Parses a JSON string and infers its type more loosely, ensuring the result is null.
- **parseInferredAsObject**: Parses a JSON string and infers its type more loosely, ensuring the result is an object.
- **parseInferredAsArray**: Parses a JSON string and infers its type more loosely, ensuring the result is an array.

#### Types

- **JsonValue**: Ensures a string is a valid JSON value.
- **JsonString**: Ensures a string is a valid JSON string.
- **JsonNumber**: Ensures a string is a valid JSON number.
- **JsonBoolean**: Ensures a string is a valid JSON boolean.
- **JsonNull**: Ensures a string is a valid JSON null.
- **JsonObject**: Ensures a string is a valid JSON object.
- **JsonArray**: Ensures a string is a valid JSON array.
- **InferredJsonValue**: Ensures a string is a valid JSON value with inferred inference.
- **InferredJsonString**: Ensures a string is a valid JSON string with inferred inference.
- **InferredJsonNumber**: Ensures a string is a valid JSON number with inferred inference.
- **InferredJsonBoolean**: Ensures a string is a valid JSON boolean with inferred inference.
- **InferredJsonNull**: Ensures a string is a valid JSON null with inferred inference.
- **InferredJsonObject**: Ensures a string is a valid JSON object with inferred inference.
- **InferredJsonArray**: Ensures a string is a valid JSON array with inferred inference.

## Changelog

To manage the changelog and versioning of the project, we use `changesets`. The `changesets` package helps automate the versioning and changelog generation process.

### Adding a Changeset

To add a new changeset:

```bash
bun run changeset
```

Follow the prompts to describe the changes and the type of version bump (major, minor, patch).

### Releasing Changes

To release the changes:

```bash
bun run release
```

This will create a new version, update the changelog, and publish the package.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add my feature'`).
5. Push to the branch (`git push origin my-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.