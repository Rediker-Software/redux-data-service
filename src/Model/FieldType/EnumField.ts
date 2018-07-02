import { includes } from "lodash";
import { IFieldType } from "./IFieldType";

export const createEnumField = (fieldEnum: any): IFieldType<any> => {
  const enumValues = Object.values(fieldEnum);

  return {
    serialize: false,
    defaultValidationRules: {
      inclusion: {
        within: enumValues,
        message: "^Selected value is not a valid choice",
      },
    },
    defaultValue: null,
    isValidType: (value) => value == null || includes(fieldEnum, value),
  };
};
