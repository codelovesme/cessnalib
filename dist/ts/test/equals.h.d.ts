export declare type Equals<T, K> = T extends K ? (K extends T ? true : false) : false;
export declare type EqualsAny<T extends any> = any extends T ? true : false;
import "./equals.h.spec";
