import { isObject } from "validate.js";
import { IFieldType } from "./IFieldType";

export const ObjectField: IFieldType<object> = {
  serialize: true,
  defaultValidationRules: { type: "object" },
  defaultValue: null,
  type: "object",
  isValidType: value => value == null || isObject(value),
  normalize: async value => value,
};
