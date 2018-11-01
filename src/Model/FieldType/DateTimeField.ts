import { IFieldType } from "./IFieldType";
import { isDate } from "validate.js";

export const DateTimeField: IFieldType<Date> = {
  serialize: true,
  defaultValidationRules: { datetime: true },
  defaultValue: null,
  isValidType: (value) => value == null || isDate(value),
  transform: async (date: Date) => date != null ? date.toISOString() : null,
  normalize: async (value: string | any): Promise<Date> => (
    isDate(value)
      ? value
      : (value != null
        ? new Date(value)
        : null
      )
  ),
  type: "dateTime",
};
