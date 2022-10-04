import { AssertTrue, AssertFalse } from "./assert.h";
import { Equals } from "./equals.h";
export declare type Result = [
    AssertTrue<Equals<{}, object>>,
    AssertTrue<Equals<object, {}>>,
    AssertTrue<Equals<{
        a: 12;
    }, {
        a: 12;
    }>>,
    AssertFalse<Equals<12, number>>,
    AssertFalse<Equals<number, 12>>
];
