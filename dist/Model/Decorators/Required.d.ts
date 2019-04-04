import { IDecorator } from "./IDecorator";
import { IValidate } from "./Validation";
export declare function required(message?: string, allowEmpty?: boolean): IDecorator<IValidate>;
