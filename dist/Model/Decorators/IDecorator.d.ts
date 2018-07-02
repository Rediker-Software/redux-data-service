export interface IDecorator<T = any> {
    (target: T, key: string): void;
}
