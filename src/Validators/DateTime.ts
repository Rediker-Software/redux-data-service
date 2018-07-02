import { parse } from "date-fns";

export const getDateTimeFormat = (options) => {
  let format;

  if (options.format) {
    format = options.format;
  } else if (options.dateOnly) {
    format = "YYYY-MM-DD";
  } else if (options.timeOnly) {
    format = "hh:mm:ss a";
  } else {
    format = "YYYY-MM-DDTHH:mm:ss"; // ISO 8601
  }

  return format;
};

export const initializeDateTimeValidator = (validate) =>
  validate.extend(validate.validators.datetime, {
    parse(value, options) {
      let parsedDate = value;
      if (!(value instanceof  Date)) {
        const format = getDateTimeFormat(options);
        const date = new Date();
        parsedDate = parse(value, format, date);
      }

      if (options.dateOnly) {
        // validate.js already strips time off when dateOnly is true, so we need to strip the hours difference caused by the timezone
        return parsedDate.getTime() - (parsedDate.getTimezoneOffset() * 60 * 1000);
      } else {
        return parsedDate.getTime();
      }

    },
    format(value) {
      return value;
    },
  });
