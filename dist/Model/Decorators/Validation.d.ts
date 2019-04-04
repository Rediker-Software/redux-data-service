import { IDecorator } from "./IDecorator";
import { IModelKeys } from "../IModel";
export interface IValidate<T = any> {
    readonly validationRules: IModelKeys<T>;
    validate(): IModelKeys<T>;
}
export declare function validation(validationRules: any): IDecorator<IValidate>;
