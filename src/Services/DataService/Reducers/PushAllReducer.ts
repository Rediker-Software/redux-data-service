import { IModel, IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export interface IPushAll<T extends IModelData> {
  items: IModel<T>[];
}

/** Adds/Updates the given array of IModel instances onto the store */
export function pushAllReducer<T extends IModelData>(
  state: IDataServiceStateRecord<T>,
  action: IAction<IPushAll<T>>,
): IDataServiceStateRecord<T> {
  return (action.payload && action.payload.items)
    ? (
      state.update("items", (items) => items.withMutations((itemsMap) => {
        action.payload.items.forEach((item) => {
          itemsMap.update(item.id, () => item);
        });
      }))
    )
    : state;
}
