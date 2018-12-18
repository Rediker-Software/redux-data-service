import { IModel, IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { ISetField } from "../ISetField";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function setFieldReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<ISetField<T>>) {
  return state.withMutations((record) => {
    const { id, fieldName, value } = action.payload;
    if (record.items.has(id)) { 
      record.update("items", (items) => items.update(id, (item: IModel<T>) => {
        return item.applyUpdates({ [fieldName]: value } as Partial<T>);
      }));
    } else if (process.env.NODE_ENV !== "production") {
      // tslint:disable-next-line
      console.warn(`setFieldReducer - attempted to set "${value}" on field "${fieldName}" for unknown id "${id}"`);
    }
  });
}
