import { IAction, IService } from "../../Services/IService";
export declare function createMockServiceState<T>(service: IService<T>, actions?: IAction[]): {
    [x: string]: T;
};
