import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/skip";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { DataService } from "../Services/DataService";
import { IModel, IModelData, IModelKeys, IModelMeta, IModelsMap } from "./IModel";
import { IFieldType } from "./FieldType";
import { IFieldRelationship } from "./Decorators";
export declare class Model<T extends IModelData> implements IModel<T> {
    serviceName: string;
    readonly fields: IModelKeys<T & any, IFieldType<any>>;
    readonly validationRules: IModelKeys<T>;
    readonly relationships: {
        [key: string]: IFieldRelationship;
    };
    readonly id: string;
    readonly dateUpdated: Date;
    readonly dateDeleted: Date;
    serializeThroughParent: boolean;
    parentServiceName: any;
    parentIdFieldName: string;
    parentModelId: any;
    protected readonly modelData: Partial<T>;
    protected readonly meta: IModelMeta<T>;
    protected readonly relatedModels: IModelsMap;
    constructor(modelData: Partial<T> & {
        id: string;
    }, meta?: Partial<IModelMeta<T>>, relatedModels?: IModelsMap);
    save(progressSubscriber?: Subscriber<any>): Promise<IModel<T>>;
    saveModel(progressSubscriber?: Subscriber<any>): Promise<IModel<any>>;
    saveRelatedModels(): Promise<IModel<T>[]>;
    validate(includeRelatedModels?: boolean): IModelKeys<T>;
    validateField(fieldName: any): any;
    protected getValidationRulesForField(fieldName: any): any;
    delete(): Promise<IModel<T>>;
    reset(): void;
    unload(): void;
    forceReload(): void;
    applyUpdates(changes?: Partial<T>, meta?: Partial<IModelMeta<T>>, relatedModels?: any): IModel<T>;
    initializeNewModel(): void;
    getField(fieldName: string, defaultValue?: any): any;
    protected checkFieldUpdateIsAllowed(key: any, value: any): void;
    setField(fieldName: string, value: any): void;
    getRelated(fieldName: string): any;
    setRelated(fieldName: string, value: any): void;
    getServiceForRelationship(relationshipKey: string): DataService<any>;
    protected triggerWillDestroyObservable(): void;
    markForDestruction(): void;
    readonly isDestroying: boolean;
    getWillDestroyObservable$(): Observable<boolean>;
    setMetaField(fieldName: any, value: any): void;
    isLoading: boolean;
    readonly isShadow: boolean;
    errors: { [P in keyof T]?: any; };
    readonly isDirty: boolean;
    isFieldDirty(fieldName: keyof T | string): boolean;
    readonly hasUnsavedChanges: boolean;
    readonly isNew: boolean;
    original(): this;
    getFieldError(fieldName: any): any;
    parseFieldValue(fieldName: string, value: any): Promise<any>;
}
