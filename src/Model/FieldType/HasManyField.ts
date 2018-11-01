import { IFieldType } from "./IFieldType";
import { ArrayField } from "./ArrayField";

export const HasManyField: IFieldType<any[]> = {
  ...ArrayField,
  serialize: false,
  type: "hasMany",
};
