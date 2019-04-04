import { IDecorator } from "./IDecorator";
import { IFieldOptions, IFieldTypes } from "./Field";
export interface IIsEnumOptions extends Partial<IFieldOptions> {
    relatedFieldName?: string;
}
export declare function isEnum(fieldEnum: any, options?: IIsEnumOptions): IDecorator<IFieldTypes>;
