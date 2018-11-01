import { IFieldType } from "./IFieldType";
import { isBoolean } from "validate.js";

export const BooleanField: IFieldType<boolean> = {
  serialize: true,
  defaultValidationRules: { type: "boolean" },
  defaultValue: false,
  isValidType: (value) => value == null || isBoolean(value),
  normalize: async (value: any) => (
    // Boolean("false") returns true, which is not the behavior we want
    value && typeof value === "string" && value.toLowerCase() === "false"
    ? false
    : Boolean(value)
  ),
};
