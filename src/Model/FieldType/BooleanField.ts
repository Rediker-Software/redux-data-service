import { IFieldType } from "./IFieldType";
import { isBoolean } from "validate.js";

export const BooleanField: IFieldType<boolean> = {
  serialize: true,
  defaultValidationRules: { type: "boolean" },
  defaultValue: false,
  isValidType: (value) => value == null || isBoolean(value),
};
