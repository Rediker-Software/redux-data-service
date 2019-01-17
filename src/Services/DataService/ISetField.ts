import { IModelData } from "../../Model";

/** Used in an action's payload to set the field on an IModel associated to the given id */
export interface ISetField<T extends IModelData> {
  id: string;
  fieldName: keyof T;
  value: any;
}
