import { IFieldType } from "./IFieldType";
import { isDate } from "validate.js";
import { format, parse } from "date-fns";

export const TimeField: IFieldType<Date> = {
  serialize: true,
  defaultValidationRules: { datetime: { timeOnly: true, message: "must be a valid time" } },
  defaultValue: null,
  isValidType: (value) => value == null || isDate(value),
  transform: async (date: Date) => date != null ? format(date, "hh:mm:ss a") : null,
  normalize: async (serializedDate: string): Promise<Date> => (
    serializedDate != null
      ? parse(serializedDate, "hh:mm:ss a", new Date())
      : null
  ),
};
