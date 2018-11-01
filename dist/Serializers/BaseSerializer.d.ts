import { IModel, IModelData, IModelFactory, IFieldType, IFieldRelationship } from "../Model";
import { ISerializer } from "./ISerializer";
export declare abstract class BaseSerializer<S, T extends IModelData, R = T> implements ISerializer<S, T, R> {
    readonly ModelClass: IModelFactory<T>;
    abstract deserialize(data: R): Promise<IModel<T>>;
    abstract serialize(modelData: IModel<T> | Partial<T>): Promise<S>;
    constructor(ModelClass: IModelFactory<T>);
    readonly relationships: any;
    readonly fields: any;
    protected isRelationship: (key: any) => any;
    transformField(model: IModel<T> | Partial<T>): (fieldType: any, fieldName: string) => Promise<[string, string]>;
    normalizeField(data: Partial<R>): (fieldType: IFieldType<any>, fieldName: string) => Promise<[string, string]>;
    transform(model: IModel<T> | Partial<T>): Promise<Partial<R>>;
    normalize(data: Partial<R>): Promise<IModel<T>>;
    protected transformRelationship(fieldValue: IModel<any> | IModel<any>[], relationship: IFieldRelationship): Promise<Partial<any>>;
    protected transformRelatedModel(relatedModel: IModel<any>): Promise<Partial<any>>;
    protected processNestedRelationship(model: IModel<T>, nestedData: any, relationship: IFieldRelationship): Promise<string | string[]>;
    protected loadRelatedModel(model: IModel<T>, relatedModelData: any, relationship: IFieldRelationship): Promise<IModel<any>>;
}
