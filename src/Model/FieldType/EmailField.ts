import { IFieldType } from "./IFieldType";
import { StringField } from "./StringField";

export const EmailField: IFieldType<string> = {
  ...StringField,
  defaultValidationRules: { email: true },
  type: "email",
};
