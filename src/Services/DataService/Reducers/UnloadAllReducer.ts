import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { DataServiceStateRecord, IDataServiceStateRecord } from "../DataServiceStateRecord";

/** Disconnects all IModel instances from the store and returns a new copy of the store */
export function unloadAllReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<null>) {
  state.items.forEach((model) => {
    model.markForDestruction();
  });

  return DataServiceStateRecord();
}
