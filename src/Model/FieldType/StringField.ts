import { isString } from "validate.js";
import { IFieldType } from "./IFieldType";

export const StringField: IFieldType<string> = {
  serialize: true,
  defaultValidationRules: { type: "string" },
  defaultValue: "",
  isValidType: (value) => value == null || isString(value),
  normalize: (value) => String(value),
  type: "string",
};
