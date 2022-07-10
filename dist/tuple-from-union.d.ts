declare type TuplePrepend<Tuple extends any[], NewElement> = ((h: NewElement, ...t: Tuple) => any) extends ((...r: infer ResultTuple) => any) ? ResultTuple : never;
declare type Consumer<Value> = (value: Value) => void;
declare type IntersectionFromUnion<Union> = (Union extends any ? Consumer<Union> : never) extends (Consumer<infer ResultIntersection>) ? ResultIntersection : never;
declare type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<Union extends any ? Consumer<Union> : never>;
declare type UnionLast<Union> = OverloadedConsumerFromUnion<Union> extends ((a: infer A) => void) ? A : never;
declare type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;
declare type TupleFromUnionRec<RemainingUnion, CurrentTuple extends any[]> = [
    RemainingUnion
] extends [never] ? {
    result: CurrentTuple;
} : {
    result: TupleFromUnionRec<UnionExcludingLast<RemainingUnion>, TuplePrepend<CurrentTuple, UnionLast<RemainingUnion>>>['result'];
};
export declare type TupleFromUnion<Union> = TupleFromUnionRec<Union, []>['result'];
export {};
