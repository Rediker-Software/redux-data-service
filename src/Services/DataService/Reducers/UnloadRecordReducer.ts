import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IModelId } from "../DataService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function unloadRecordReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModelId>) {
  return state.withMutations((record) => {
    const { id } = action.payload;
    const oldModel = record.items.get(id);

    if (oldModel) {
      oldModel.markForDestruction();
    }

    record.set("items", record.items.delete(id));
  });
}
