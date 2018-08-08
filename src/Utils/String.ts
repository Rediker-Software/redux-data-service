
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

/**
 * Given a path string in dot notation compatible with lodash's `get` and `set` functions,
 * will return the path as an array of strings with the given field as the second to last item.
 *
 * @param {string} path
 * @param field
 * @returns {string[]}
 */
export const addPenultimateFieldToPath = (path: string, field): string[] => {
  const updatedPath = path.split(".");
  updatedPath.splice(updatedPath.length - 1, 0, field);

  return updatedPath;
};
