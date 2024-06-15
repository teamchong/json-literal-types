import { parseAs, parseAsString, parseAsNumber, parseAsBoolean, parseAsNull, parseAsObject, parseAsArray, parseInferredAs, parseInferredAsString, parseInferredAsNumber, parseInferredAsBoolean, parseInferredAsNull, parseInferredAsObject, parseInferredAsArray } from './index'
import { expect, test } from "bun:test";

test('parseAs', () => {
  // @ts-expect-error expect json
  expect(() => parseAs('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect string
  expect(() => expect(parseAs('"Hello\\nWorld\\u838a"')).toEqual(null)).toThrowError()
  expect(parseAs('"Hello\\nWorld\\u838a"')).toBeString()
  expect(parseAs('"Hello\\nWorld\\u838a"')).toEqual('Hello\nWorld莊')

  // @ts-expect-error expect number
  expect(() => expect(parseAs('123')).toEqual(null)).toThrowError()
  expect(parseAs('123')).toBeNumber()
  expect(parseAs('123')).toEqual(123)

  // @ts-expect-error expect boolean
  expect(() => expect(parseAs('true')).toEqual(null)).toThrowError()
  expect(parseAs('true')).toBeBoolean()
  expect(parseAs('true')).toEqual(true)

  // @ts-expect-error expect json
  expect(() => expect(parseAs('null')).toEqual('number')).toThrowError()
  expect(parseAs('null')).toBeNull()
  expect(parseAs('null')).toEqual(null)

  // @ts-expect-error expect object
  expect(() => expect(parseAs('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual(null)).toThrowError()
  expect(parseAs('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toBeObject()
  expect(parseAs('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual({"key":[1,"Hello\nWorld莊",true,false,null]})

  // @ts-expect-error expect array
  expect(() => expect(parseAs('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual(null)).toThrowError()
  expect(parseAs('[1,"Hello\\nWorld\\u838a",true,false,null]')).toBeObject()
  expect(parseAs('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual([1,"Hello\nWorld莊",true,false,null])
})
test('parseAsString', () => {
  // @ts-expect-error expect json
  expect(() => parseAsString('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect string
  expect(() => expect(parseAsString('"Hello\\nWorld\\u838a"')).toEqual(null)).toThrowError()
  expect(parseAsString('"Hello\\nWorld\\u838a"')).toBeString()
  expect(parseAsString('"Hello\\nWorld\\u838a"')).toEqual('Hello\nWorld莊')
})
test('parseAsNumber', () => {
  // @ts-expect-error expect json
  expect(() => parseAsNumber('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect number
  expect(() => expect(parseAsNumber('123')).toEqual(null)).toThrowError()
  expect(parseAsNumber('123')).toBeNumber()
  expect(parseAsNumber('123')).toEqual(123)
  expect(parseAsNumber('123.456')).toBeNumber()
  expect(parseAsNumber('123.456')).toEqual(123.456)
  expect(parseAsNumber('123.456e21')).toBeNumber()
  expect(parseAsNumber('123.456e21')).toEqual(123.456e21)
  expect(parseAsNumber('123.456e-21')).toBeNumber()
  expect(parseAsNumber('123.456e-21')).toEqual(123.456e-21)
})
test('parseAsBoolean', () => {
  // @ts-expect-error expect json
  expect(() => parseAsBoolean('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect boolean
  expect(() => expect(parseAsBoolean('true')).toEqual(null)).toThrowError()
  expect(parseAsBoolean('true')).toBeBoolean()
  expect(parseAsBoolean('true')).toEqual(true)
})
test('parseAsNull', () => {
  // @ts-expect-error expect json
  expect(() => parseAsNull('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect json
  expect(() => expect(parseAsNull('null')).toEqual('number')).toThrowError()
  expect(parseAsNull('null')).toBeNull()
  expect(parseAsNull('null')).toEqual(null)
})
test('parseAsObject', () => {
  // @ts-expect-error expect json
  expect(() => parseAsObject('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect object
  expect(() => expect(parseAsObject('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual(null)).toThrowError()
  expect(parseAsObject('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toBeObject()
  expect(parseAsObject('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual({"key":[1,"Hello\nWorld莊",true,false,null]})
})
test('parseAsArray', () => {
  // @ts-expect-error expect json
  expect(() => parseAsArray('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect array
  expect(() => expect(parseAsArray('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual(null)).toThrowError()
  expect(parseAsArray('[1,"Hello\\nWorld\\u838a",true,false,null]')).toBeObject()
  expect(parseAsArray('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual([1,"Hello\nWorld莊",true,false,null])
})
test('parseInferredAs', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAs('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect string
  expect(() => expect(parseInferredAs('"Hello\\nWorld\\u838a"')).toEqual(null)).toThrowError()
  expect(parseInferredAs('"Hello\\nWorld\\u838a"')).toBeString()
  expect(parseInferredAs('"Hello\\nWorld\\u838a"')).toEqual('Hello\nWorld莊')

  // @ts-expect-error expect number
  expect(() => expect(parseInferredAs('123')).toEqual(null)).toThrowError()
  expect(parseInferredAs('123')).toBeNumber()
  expect(parseInferredAs('123')).toEqual(123)

  // @ts-expect-error expect boolean
  expect(() => expect(parseInferredAs('true')).toEqual(null)).toThrowError()
  expect(parseInferredAs('true')).toBeBoolean()
  expect(parseInferredAs('true')).toEqual(true)

  // @ts-expect-error expect json
  expect(() => expect(parseInferredAs('null')).toEqual('number')).toThrowError()
  expect(parseInferredAs('null')).toBeNull()
  expect(parseInferredAs('null')).toEqual(null)

  // @ts-expect-error expect object
  expect(() => expect(parseInferredAs('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual(null)).toThrowError()
  expect(parseInferredAs('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toBeObject()
  expect(parseInferredAs('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual({"key":[1,"Hello\nWorld莊",true,false,null]})

  // @ts-expect-error expect array
  expect(() => expect(parseInferredAs('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual(null)).toThrowError()
  expect(parseInferredAs('[1,"Hello\\nWorld\\u838a",true,false,null]')).toBeObject()
  expect(parseInferredAs('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual([1,"Hello\nWorld莊",true,false,null])
})
test('parseInferredAsString', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAsString('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect string
  expect(() => expect(parseInferredAsString('"Hello\\nWorld\\u838a"')).toEqual(null)).toThrowError()
  expect(parseInferredAsString('"Hello\\nWorld\\u838a"')).toBeString()
  expect(parseInferredAsString('"Hello\\nWorld\\u838a"')).toEqual('Hello\nWorld莊')
})
test('parseInferredAsNumber', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAsNumber('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect number
  expect(() => expect(parseInferredAsNumber('123')).toEqual(null)).toThrowError()
  expect(parseInferredAsNumber('123')).toBeNumber()
  expect(parseInferredAsNumber('123')).toEqual(123)
})
test('parseInferredAsBoolean', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAsBoolean('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect boolean
  expect(() => expect(parseInferredAsBoolean('true')).toEqual(null)).toThrowError()
  expect(parseInferredAsBoolean('true')).toBeBoolean()
  expect(parseInferredAsBoolean('true')).toEqual(true)
})
test('parseInferredAsNull', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAsNull('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect json
  expect(() => expect(parseInferredAsNull('null')).toEqual('number')).toThrowError()
  expect(parseInferredAsNull('null')).toBeNull()
  expect(parseInferredAsNull('null')).toEqual(null)
})
test('parseInferredAsObject', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAsObject('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect object
  expect(() => expect(parseInferredAsObject('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual(null)).toThrowError()
  expect(parseInferredAsObject('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toBeObject()
  expect(parseInferredAsObject('{"key":[1,"Hello\\nWorld\\u838a",true,false,null]}')).toEqual({"key":[1,"Hello\nWorld莊",true,false,null]})
})
test('parseInferredAsArray', () => {
  // @ts-expect-error expect json
  expect(() => parseInferredAsObject('Hello\\nWorld\\u838a')).toThrowError()

  // @ts-expect-error expect array
  expect(() => expect(parseInferredAsArray('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual(null)).toThrowError()
  expect(parseInferredAsArray('[1,"Hello\\nWorld\\u838a",true,false,null]')).toBeObject()
  expect(parseInferredAsArray('[1,"Hello\\nWorld\\u838a",true,false,null]')).toEqual([1,"Hello\nWorld莊",true,false,null])
})
