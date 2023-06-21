export * from "./tuple-from-union";
export * as test from "./test";
export declare type TupleHead<Tuple extends readonly unknown[]> = Tuple extends [
    infer HeadElement,
    ...(readonly unknown[])
] ? HeadElement : never;
export declare type TupleTail<Tuple extends readonly unknown[]> = Tuple extends [
    unknown,
    ...infer TailElements
] ? TailElements : never;
/**
 * Returns tuple types that include every string in union
 * TupleUnion<keyof { bar: string; leet: number }>;
 * ["bar", "leet"] | ["leet", "bar"];
 */
export declare type TupleUnionFromUnion<U extends string, R extends string[] = []> = {
    [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnionFromUnion<Exclude<U, S>, [...R, S]>;
}[U] & string[];
export declare type UnionFromTuple<Tuple extends Array<unknown>> = Tuple[number];
export declare type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;
export declare type KeyForValue<T extends object, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
