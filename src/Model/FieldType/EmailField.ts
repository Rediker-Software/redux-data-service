import { IFieldType } from "./IFieldType";
import { isString } from "validate.js";

export const EmailField: IFieldType<string> = {
  serialize: true,
  defaultValidationRules: { email: true },
  defaultValue: "",
  isValidType: (value) => value == null || isString(value),
  type: "email",
};
