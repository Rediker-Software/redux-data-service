import { IModel, IModelData, IModelFactory } from "../Model/IModel";
import { IFieldRelationship } from "../Model/Decorators";
import { IFieldType } from "../Model/FieldType";
import { IQueryResponse, IRawQueryResponse } from "../Query";
import { IMapper } from "./IMapper";
export declare class Mapper<T extends IModelData, R = T> implements IMapper<T, R> {
    readonly ModelClass: IModelFactory<T>;
    constructor(ModelClass: IModelFactory<T>);
    readonly relationships: any;
    readonly fields: any;
    protected isRelationship: (key: any) => any;
    transformField(model: IModel<T> | Partial<T>): (fieldType: any, fieldName: string) => Promise<[string, any]>;
    transform(model: IModel<T> | Partial<T>): Promise<Partial<R>>;
    transformPatch(model: IModel<T> | Partial<T> | any): Promise<any>;
    transformList(models: IModel<T>[]): Promise<R[]>;
    normalizeField(data: Partial<R>): (fieldType: IFieldType<any>, fieldName: string) => Promise<[string, any]>;
    normalize(data: Partial<R>): Promise<IModel<T>>;
    normalizeQueryResponse({ items, ...data }: IRawQueryResponse<R>): Promise<IQueryResponse & {
        items: IModel<T>[];
    }>;
    protected transformRelationship(fieldValue: IModel<any> | IModel<any>[], relationship: IFieldRelationship): Promise<Partial<any>>;
    protected transformRelatedModel(relatedModel: IModel<any>): Promise<Partial<any>>;
    protected processNestedRelationship(model: IModel<T>, nestedData: any, relationship: IFieldRelationship): Promise<string | string[]>;
    protected loadRelatedModel(model: IModel<T>, relatedModelData: any, relationship: IFieldRelationship): Promise<IModel<any>>;
}
