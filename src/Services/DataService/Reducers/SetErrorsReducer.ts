import { IModelData, IModel } from "../../../Model/IModel";
import { IAction } from "../../IService";
import { hash } from "immutable";
import { IDataServiceStateRecord } from "../DataServiceStateRecord";

export function setErrorsReducer<T extends IModelData>(state: IDataServiceStateRecord<T>, action: IAction<IModel<T>>) {
    return state.withMutations((record) =>
      record.update("requestCache", (requestCache) =>
        requestCache.update(hash(action.meta.queryParams || {}).toString(), (requestCacheRecord) =>
        requestCacheRecord && requestCacheRecord.set("errors", action.payload.errors),
      ),
    ),
  );
}
