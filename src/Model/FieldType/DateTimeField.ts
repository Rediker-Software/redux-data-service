import { IFieldType } from "./IFieldType";
import { isDate } from "validate.js";

export const DateTimeField: IFieldType<Date> = {
  serialize: true,
  defaultValidationRules: { datetime: true },
  defaultValue: null,
  isValidType: (value) => value == null || isDate(value),
  transform: (date: Date) => date != null ? date.toISOString() : null,
  normalize: (serializedDate: string): Date => (
    serializedDate != null
      ? new Date(serializedDate)
      : null
  ),
  type: "dateTime",
};
