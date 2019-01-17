import { IModelData, IModel } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

/** Adds/Updates the given IModel instance to the store */
export function pushRecordReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModel<T>>) {
  const item = action.payload;

  return state.update("items", items =>
    items.update(item.id, () => item),
  );
}
