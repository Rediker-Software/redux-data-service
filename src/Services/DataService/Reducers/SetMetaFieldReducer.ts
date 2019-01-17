import { IAction } from "../../IService";
import { IModel, IModelData, IModelMeta } from "../../../Model/IModel";

import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export interface ISetMetaField<T extends IModelData> {
  id: string;
  fieldName: keyof IModelMeta<T>;
  value: any;
}

/** Sets the given meta field for the IModel instance associated to the given id */
export function setMetaFieldReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<ISetMetaField<T>>) {
  return state.withMutations((record) => {
    const { id, fieldName, value } = action.payload;
    if (record.items.has(id)) {
      record.update("items", (items) => items.update(id, (item: IModel<T>) => {
        return item.applyUpdates(null, { [fieldName]: value });
      }));
    }
  });
}
