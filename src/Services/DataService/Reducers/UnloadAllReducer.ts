import { IModelData } from "../../../Model/IModel";
import { DataServiceStateRecord, IDataServiceStateRecord } from "../DataServiceStateRecord";

export function unloadAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>) {
  state.items.forEach((oldModel) => {
    oldModel.markForDestruction();
  });

  return DataServiceStateRecord();
}
