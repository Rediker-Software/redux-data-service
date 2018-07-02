
/**
 * Given a path string in dot notation compatible with lodash's `get` and `set` functions,
 * this will return the nested value.
 *
 * For example, given path "a.b.c", this will return "c".
 *
 * @param path
 * @returns {any}
 */
export const getNestedFieldName = (path) => {
  const fieldNameParts = path.split(".");
  return fieldNameParts[fieldNameParts.length - 1];
};
