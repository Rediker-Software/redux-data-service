import { includes } from "lodash";
import { IFieldType } from "./IFieldType";

export const createEnumField = (fieldEnum: any): IFieldType<any> & { fieldEnum: any} => {
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
    fieldEnum,
    isValidType: (value) => value == null || includes(fieldEnum, value),
    type: "enum",
    normalize: async (value) => value in fieldEnum ? fieldEnum[value] : null,
  };
};
