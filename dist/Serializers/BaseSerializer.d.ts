import { IModel, IModelData, IModelFactory, IFieldType, IFieldRelationship } from "../Model";
import { ISerializer } from "./ISerializer";
export declare abstract class BaseSerializer<S, T extends IModelData, R = T> implements ISerializer<S, T, R> {
    readonly ModelClass: IModelFactory<T>;
    abstract deserialize(data: R): IModel<T>;
    abstract serialize(modelData: IModel<T> | Partial<T>): S;
    constructor(ModelClass: IModelFactory<T>);
    readonly relationships: any;
    readonly fields: any;
    protected isRelationship: (key: any) => any;
    transformField(model: IModel<T> | Partial<T>): (fieldType: any, fieldName: string) => any;
    normalizeField(data: Partial<R>): (fieldType: IFieldType<any>, fieldName: string) => any;
    transform(model: IModel<T> | Partial<T>): Partial<R>;
    normalize(data: Partial<R>): IModel<T>;
    protected transformRelationship(fieldValue: IModel<any> | IModel<any>[], relationship: IFieldRelationship): Partial<any>;
    protected transformRelatedModel(relatedModel: IModel<any>): Partial<any>;
    protected processNestedRelationship(model: IModel<T>, nestedData: any, relationship: IFieldRelationship): string | string[];
    protected loadRelatedModel(model: IModel<T>, relatedModelData: any, relationship: IFieldRelationship): IModel<any>;
}
