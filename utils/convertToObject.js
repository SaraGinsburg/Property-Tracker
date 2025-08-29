export function convertToSerializeableObject(doc) {
  if (!doc || typeof doc !== 'object') {
    throw new Error('Input must be a valid object');
  }

  //Deep conversion to handle nested objects and arrays
  return JSON.parse(JSON.stringify(doc));
}
