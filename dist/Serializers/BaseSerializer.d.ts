import { IModel, IModelData, IModelFactory, IFieldType } from "../Model";
import { ISerializer } from "./ISerializer";
export declare abstract class BaseSerializer<T extends IModelData, S> implements ISerializer<T, S> {
    readonly ModelClass: IModelFactory<T>;
    abstract deserialize(data: S): IModel<T>;
    abstract serialize(modelData: Partial<T>): S;
    constructor(ModelClass: IModelFactory<T>);
    readonly relationships: any;
    readonly fields: any;
    protected isRelationship: (key: any) => any;
    transformField(model: IModel<T> | Partial<T>): (fieldType: any, fieldName: string) => any;
    normalizeField(data: Partial<T>): (fieldType: IFieldType<any>, fieldName: string) => any;
    transform(model: IModel<T> | Partial<T>): Partial<T>;
    normalize(data: any): IModel<T>;
}
