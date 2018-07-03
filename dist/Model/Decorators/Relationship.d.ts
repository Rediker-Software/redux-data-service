import { IDecorator } from "./IDecorator";
import { IFieldType } from "../FieldType";
import { IFieldOptions, IFieldTypes } from "./Field";
export declare enum RelationshipType {
    BelongsTo = "BelongsTo",
    HasMany = "HasMany"
}
export interface IFieldRelationship {
    field: string;
    serviceName: string;
    relatedFieldName: string;
    type: RelationshipType;
}
export interface IRelationship extends IFieldTypes {
    readonly relationships: {
        [key: string]: IFieldRelationship;
    };
    getRelated(key: any): any;
    setRelated(key: any, value: any): void;
}
export interface IRelationshipOptions extends IFieldOptions {
    serviceName?: string;
    relatedFieldName?: string;
}
export declare const getFieldTypeForRelationship: (relationshipType: RelationshipType) => IFieldType<any>;
export declare const getRelatedFieldNameForRelationship: (relationshipType: RelationshipType, baseName: string) => string;
export declare function relationship(relationshipType: RelationshipType, options?: IRelationshipOptions): IDecorator<IRelationship>;
