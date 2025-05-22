/**
 * Converts a Mongoose lean document into a serializable plain JavaScript object.
 *
 * @param {Object} leanDocument - The Mongoose lean document to be converted.
 * @returns {Object} A plain JavaScript object that is a serializable representation of the input document.
 */
export function convertToSerializeableObject(leanDocument) {
  const serialized = { ...leanDocument };

  for (const key of Object.keys(serialized)) {
    const value = serialized[key];

    if (
      value &&
      typeof value === 'object' &&
      typeof value.toJSON === 'function' &&
      typeof value.toString === 'function'
    ) {
      serialized[key] = value.toString();
    }
  }

  return serialized;
}
