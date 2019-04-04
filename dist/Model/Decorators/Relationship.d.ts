import { Omit } from "../../Omit";
import { IFieldType } from "../FieldType";
import { IDecorator } from "./IDecorator";
import { IFieldOptions, IFieldTypes } from "./Field";
export declare enum RelationshipType {
    BelongsTo = "BelongsTo",
    HasMany = "HasMany"
}
export interface IFieldRelationship {
    field: string;
    serviceName?: string;
    serviceNameField?: string;
    relatedFieldName: string;
    modelRelatedFieldName?: string;
    type: RelationshipType;
}
export interface IRelationship extends IFieldTypes {
    readonly relationships: {
        [key: string]: IFieldRelationship;
    };
    getRelated(key: any): any;
    setRelated(key: any, value: any): void;
}
export interface IRelationshipOptions extends Partial<Omit<IFieldOptions, "type"> & Omit<IFieldRelationship, "type" | "field">> {
}
export declare const getFieldTypeForRelationship: (relationshipType: RelationshipType) => IFieldType<any>;
export declare const getRelatedFieldNameForRelationship: (relationshipType: RelationshipType, baseName: string) => string;
export declare function relationship(relationshipType: RelationshipType, options?: IRelationshipOptions): IDecorator<IRelationship>;
