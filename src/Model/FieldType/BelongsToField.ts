import { IFieldType } from "./IFieldType";
import { ObjectField } from "./ObjectField";

export const BelongsToField: IFieldType = {
  ...ObjectField,
  serialize: false,
  type: "belongsTo",
};
