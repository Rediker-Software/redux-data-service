import { isObject } from "validate.js";
import { IFieldType } from "./IFieldType";

export const ObjectField: IFieldType<object> = {
  serialize: true,
  defaultValidationRules: { type: "object" },
  defaultValue: null,
  isValidType: value => value == null || isObject(value),
  normalize: value => value,
};
