export declare type AssertTrue<T extends true> = T;
export declare type AssertFalse<T extends false> = T;
export declare type AssertNever<T extends never> = T;
export declare type AssertSuper<Super, K extends Super> = K;
export declare type AssertHasProp<T extends object, Prop extends keyof T> = Prop;
