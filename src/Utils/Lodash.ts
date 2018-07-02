import * as convert from "lodash/fp/convert";
import { mapValues, forEach, isPlainObject } from "lodash";

/**
 * By default, lodash/fp/mapValues does not return the key to the iterator.
 * This example was lifted from their docs to make it work as expected.
 *
 * @type {any}
 * @see https://github.com/lodash/lodash/wiki/FP-Guide
 */
export const mapValuesWithKeys = convert("mapValues", mapValues, {
  cap: false,
});

/**
 * Flattens the keys of an object's immediate children onto a copy of the parent object.
 *
 * For example:
 *
 * Given input: `{ a: { b: 123, c: 456 }, name: "Jessica" }`,
 * This will output: `{ "a.b": 123, "a.c": 456, name: "Jessica" }`.
 *
 * Note that this function will intentionally go only one level deep.
 *
 * @param obj
 * @returns {any}
 */
export const flattenObjectKeys = (obj) => {
  const output: any = {};

  forEach(obj, (child, key) => {
    if (isPlainObject(child)) {
      forEach(child, (subChild, childKey) => {
        output[`${key}.${childKey}`] = subChild;
      });
    } else {
      output[key] = child;
    }
  });

  return output;
};
