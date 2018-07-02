import { isString } from "validate.js";
import { IFieldType } from "./IFieldType";

export const PhoneNumberField: IFieldType<string> = {
  serialize: true,
  defaultValidationRules: { phoneNumber: true },
  defaultValue: "",
  isValidType: (value) => value == null || isString(value),
};
