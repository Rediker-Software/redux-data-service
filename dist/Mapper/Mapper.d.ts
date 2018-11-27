import { IMapper } from ".";
import { IModel, IModelData, IModelFactory, IFieldType, IFieldRelationship } from "../Model";
export declare class Mapper<T extends IModelData, R = T> implements IMapper<T, R> {
    readonly ModelClass: IModelFactory<T>;
    constructor(ModelClass: IModelFactory<T>);
    readonly relationships: any;
    readonly fields: any;
    protected isRelationship: (key: any) => any;
    transformField(model: IModel<T> | Partial<T>): (fieldType: any, fieldName: string) => Promise<[string, any]>;
    normalizeField(data: Partial<R>): (fieldType: IFieldType<any>, fieldName: string) => Promise<[string, any]>;
    transform(model: IModel<T> | Partial<T>): Promise<Partial<R>>;
    normalize(data: Partial<R>): Promise<IModel<T>>;
    protected transformRelationship(fieldValue: IModel<any> | IModel<any>[], relationship: IFieldRelationship): Promise<Partial<any>>;
    protected transformRelatedModel(relatedModel: IModel<any>): Promise<Partial<any>>;
    protected processNestedRelationship(model: IModel<T>, nestedData: any, relationship: IFieldRelationship): Promise<string | string[]>;
    protected loadRelatedModel(model: IModel<T>, relatedModelData: any, relationship: IFieldRelationship): Promise<IModel<any>>;
}
