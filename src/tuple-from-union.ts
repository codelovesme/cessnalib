type TuplePrepend<Tuple extends any[], NewElement> =
    ((h: NewElement, ...t: Tuple) => any) extends ((...r: infer ResultTuple) => any) ? ResultTuple : never;

type Consumer<Value> = (value: Value) => void;

type IntersectionFromUnion<Union> =
    (Union extends any ? Consumer<Union> : never) extends (Consumer<infer ResultIntersection>)
    ? ResultIntersection
    : never;

type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<Union extends any ? Consumer<Union> : never>;

type UnionLast<Union> = OverloadedConsumerFromUnion<Union> extends ((a: infer A) => void) ? A : never;

type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;

type TupleFromUnionRec<RemainingUnion, CurrentTuple extends any[]> =
    [RemainingUnion] extends [never]
    ? { result: CurrentTuple }
    : { result: TupleFromUnionRec<UnionExcludingLast<RemainingUnion>, TuplePrepend<CurrentTuple, UnionLast<RemainingUnion>>>['result'] };

export type TupleFromUnion<Union> = TupleFromUnionRec<Union, []>['result'];