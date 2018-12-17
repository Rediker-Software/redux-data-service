import { IModelData } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { IModelId } from "../DataService";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function unloadRecordReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModelId>) {
  const { id } = action.payload;
  const model = state.items.get(id);

  if (model) {
    model.markForDestruction();
  }

  return state.update("items",
    (items) => items.delete(id),
  );
}
