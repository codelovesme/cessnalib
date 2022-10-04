export type AssertTrue<T extends true> = T;
export type AssertFalse<T extends false> = T;
export type AssertNever<T extends never> = T;
export type AssertSuper<Super, K extends Super> = K;
export type AssertHasProp<T extends object, Prop extends keyof T> = Prop;