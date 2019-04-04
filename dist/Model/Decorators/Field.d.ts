import { Omit } from "../../Omit";
import { IModelKeys } from "../IModel";
import { IFieldType } from "../FieldType";
import { IDecorator } from "./IDecorator";
import { IValidate } from "./Validation";
export interface IFieldTypes<T = any> extends IValidate {
    readonly fields: IModelKeys<T, IFieldType>;
}
export interface IFieldOptions extends Partial<Omit<IFieldType, "navigationFieldName">> {
}
export declare function field(fieldType: IFieldType, options?: IFieldOptions & any): IDecorator<IFieldTypes>;
