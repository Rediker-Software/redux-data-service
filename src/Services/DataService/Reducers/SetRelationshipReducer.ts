import { IModel, IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { ISetField } from "../ISetField";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

/** Sets the given relationship onto the IModel associated to the given id */
export function setRelationshipReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<ISetField<T>>) {
  return state.withMutations((record) => {
    const { id, fieldName, value } = action.payload;
    if (record.items.has(id)) {
      record.update("items", (items) => items.update(id, (item: IModel<T>) => {
        return item.applyUpdates(undefined, undefined, { [fieldName]: value });
      }));
    } else if (process.env.NODE_ENV !== "production") {
      // tslint:disable-next-line
      console.warn(`setRelationshipReducer - attempted to set "${value}" on field "${fieldName}" for unknown id "${id}"`);
    }
  });
}
