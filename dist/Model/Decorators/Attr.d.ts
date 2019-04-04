import { IDecorator } from "./IDecorator";
import { IModelKeys } from "../IModel";
import { IFieldType } from "../FieldType";
import { IFieldTypes, IFieldOptions } from "./Field";
export interface IAttrs<T = any> extends IFieldTypes {
    readonly fields: IModelKeys<T, IFieldType>;
    getField(fieldName: any, defaultValue: any): any;
    setField(fieldName: any, value: any): void;
}
export declare function attr(fieldType: IFieldType, options?: IFieldOptions): IDecorator<IAttrs>;
