import { TupleFromUnion as _TupleFromUnion } from "./tuple-from-union";
export * as test from "./test";

export type TupleFromUnion<Union> = _TupleFromUnion<Union>;
export type TupleHead<Tuple extends readonly unknown[]> = Tuple extends [
  infer HeadElement,
  ...(readonly unknown[])
]
  ? HeadElement
  : never;

export type TupleTail<Tuple extends readonly unknown[]> = Tuple extends [
  unknown,
  ...infer TailElements
]
  ? TailElements
  : never;
/**
 * Returns tuple types that include every string in union
 * TupleUnion<keyof { bar: string; leet: number }>;
 * ["bar", "leet"] | ["leet", "bar"];
 */
export type TupleUnionFromUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnionFromUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];
export type UnionFromTuple<Tuple extends Array<unknown>> = Tuple[number];
