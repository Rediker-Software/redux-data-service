import { IModel, IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export interface IPushAll<T extends IModelData> {
  items: IModel<T>[];
}

export function pushAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IPushAll<T>>) {
  return state.withMutations((record) => {
    record.update("items", (items) => items.withMutations((itemsMap) => {
      action.payload.items.forEach((item) => {
        itemsMap.update(item.id, () => item);
      });
    }));
  });
}
