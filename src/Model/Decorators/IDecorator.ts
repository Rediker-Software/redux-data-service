/**
 * A TypeScript property decorator. Use it wisely, my son.
 *
 * @see http://www.typescriptlang.org/docs/handbook/decorators.html#decorator-factories
 * @see https://gist.github.com/remojansen/16c661a7afd68e22ac6e#file-property_decorator-ts-L1
 */
export interface IDecorator<T = any> {
  (target: T, key: string): void;
}
