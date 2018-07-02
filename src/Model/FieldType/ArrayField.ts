import { isArray } from "validate.js";
import { IFieldType } from "./IFieldType";

export const ArrayField: IFieldType<any[]> = {
  serialize: true,
  defaultValidationRules: { type: "array" },
  defaultValue: [],
  isValidType: (value) => value == null || isArray(value),
};
