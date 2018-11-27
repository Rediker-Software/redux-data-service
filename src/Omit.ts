/**
 * Creates a type whose signature contains the given interface `T`, minus the keys named in `K`.
 *
 * For example: `Omit<IStudentData, "name" | "age">` will return a type with the given interface but without "name" or "age".
 *
 * "Borrowed" from Material UI.
 */
export type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
