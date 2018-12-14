import { IModel, IModelData } from "../../../Model";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";
import { ISetField } from "./SetFieldReducer";

export function setQueryResponseReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<ISetField<T>>) {
  return state.withMutations((record) => {
    const { id, fieldName, value } = action.payload;
    if (record.items.has(id)) {
      record.update("items", (items) => items.update(id, (item: IModel<T>) => {
        return item.applyUpdates(undefined, undefined, { [fieldName]: value });
      }));
    } else if (process.env.NODE_ENV !== "production") {
      // tslint:disable-next-line
      console.warn(`${this.name}: setQueryResponseReducer - attempted to set "${value}" on field "${fieldName}" for unknown id "${id}"`);
    }
  });
}
