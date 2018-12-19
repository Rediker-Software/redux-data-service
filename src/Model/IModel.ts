import { DataService } from "../Services/DataService/DataService";
import { IRelationship } from "./Decorators/Relationship";
import { IAttrs } from "./Decorators/Attr";

export type IModelKeys<T, U = any> = {[P in keyof T]?: U} | null;

export interface IModelData {
  readonly id: string;
  readonly dateUpdated: Date;
  readonly dateDeleted: Date;
}

export interface IModelAPIData {
  readonly id: string;
}

export interface IModelMeta<T> {
  readonly isShadow: boolean;
  isLoading: boolean;
  changes?: Partial<T>;
  errors: IModelKeys<T>;
}

export interface IModel<T extends IModelData> extends IModelMeta<T>, IModelData, IAttrs, IRelationship {
  readonly isDirty: boolean;
  readonly hasUnsavedChanges: boolean;
  readonly isNew: boolean;
  readonly serviceName: string;
  save(): Promise<IModel<T>>;
  saveModel(): Promise<IModel<T>>;
  saveRelatedModels(): Promise<IModel<T>[]>;
  validate(): IModelKeys<T>;
  validateField(fieldName: string): IModelKeys<T>;
  reset(): void;
  unload(): void;
  forceReload(): void;
  applyUpdates(changes?: Partial<T>, meta?: Partial<IModelMeta<T>>, relationships?: any): IModel<T>;
  initializeNewModel(): void;
  markForDestruction(): void;
  parseFieldValue(fieldName: string, value: any): Promise<any>;
  getServiceForRelationship(relationshipKey: string): DataService<any>;
}

export interface IModelFactory<T extends IModelData> {
  new(modelData?: Partial<T>, meta?: Partial<IModelMeta<T>>, relatedModels?: IModelsMap): IModel<T>;
}

export interface IModelsMap {
  [key: string]: IModel<any> | IModel<any>[];
}
