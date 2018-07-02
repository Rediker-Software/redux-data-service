import { isNumber } from "validate.js";
import { IFieldType } from "./IFieldType";

export const NumberField: IFieldType<number> = {
  serialize: true,
  defaultValidationRules: { numericality: true },
  defaultValue: 0,
  isValidType: (value) => value == null || isNumber(value),
};
