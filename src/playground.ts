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
  console.log(inferredParsedObject); // { host: 'localhost', port: 8080 }
  
  const inferredParsedString = parseInferredAsString('"hello\\nworld\\u838a"');
  console.log(inferredParsedString); // "hello\nworld莊"
  
  const inferredParsedNumber = parseInferredAsNumber('42');
  console.log(inferredParsedNumber); // 42
  
  const inferredParsedBoolean = parseInferredAsBoolean('true');
  console.log(inferredParsedBoolean); // true
  
  const inferredParsedNull = parseInferredAsNull('null');
  console.log(inferredParsedNull); // null
  
  const inferredParsedObject2 = parseInferredAsObject('{"host":"localhost","port":8080}');
  console.log(inferredParsedObject2); // { host: 'localhost', port: 8080 }
  
  const inferredParsedArray = parseInferredAsArray('[{"host":"localhost","port":8080}]');
  console.log(inferredParsedArray); // [{ host: 'localhost', port: 8080 }]