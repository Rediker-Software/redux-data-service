import { IModelData, IModel } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function pushRecordReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModel<T>>) {
  return state.withMutations((record) => {
    const item = action.payload;
    record.set("items", record.items.update(item.id, () => item));
  });
}
