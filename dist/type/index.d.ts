export declare namespace type {
    type HttpHeaderUnion = "a-im" | "accept" | "accept-charset" | "accept-encoding" | "accept-language" | "accept-datetime" | "access-control-request-method" | "access-control-request-headers" | "authorization" | "cache-control" | "connection" | "content-length" | "content-type" | "cookie" | "date" | "expect" | "forwarded" | "from" | "host" | "if-match" | "if-modified-since" | "if-none-match" | "if-range" | "if-unmodified-since" | "max-forwards" | "origin" | "pragma" | "proxy-authorization" | "range" | "referer" | "te" | "user-agent" | "upgrade" | "via" | "Warning";
    type Headers = {
        [key in HttpHeaderUnion]?: string;
    };
    type RecursivePartial<T> = {
        [P in keyof T]?: T[P] extends Array<infer U> ? Array<RecursivePartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<RecursivePartial<U>> : T[P] extends object ? RecursivePartial<T[P]> : T[P];
    };
    class Observable<T> {
        private listeners;
        constructor(run: (publish: (data: T) => void) => void);
        subscribe(callback: Callback<T>): void;
    }
    class Exception {
        message: string;
        innerException?: Exception;
        constructor(message: string, innerException?: Exception);
    }
    class Map<K, V> {
        private compareKeys?;
        private keys;
        private values;
        constructor(compareKeys?: (key1: K, key2: K) => boolean);
        add(key: K, value: V): void;
        keyExists(key: K): boolean;
        set(key: K, value: V): void;
        remove(key: K): void;
        indexOf(key: K): number;
        get(key: K): V;
        getKeys(): K[];
        getValues(): V[];
    }
    interface Callback<T> {
        (t: T | Exception): void;
    }
    interface Classifiable {
        className: string;
    }
    interface Identifiable {
        id: string;
    }
    interface Named {
        name: string;
    }
    class Point2D {
        x: number;
        y: number;
        className: string;
        constructor(x: number, y: number);
    }
    class TimeSpan {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        miliseconds: number;
        className: string;
        constructor(days: number, hours: number, minutes: number, seconds: number, miliseconds: number);
    }
    class Time implements Classifiable {
        date: Date;
        clock: Clock;
        className: string;
        constructor(date: Date, clock: Clock);
    }
    class Date implements Classifiable {
        year: number;
        month: number;
        day: number;
        className: string;
        constructor(year: number, month: number, day: number);
    }
    class Clock implements Classifiable {
        hour: number;
        minute: number;
        second: number;
        className: string;
        constructor(hour: number, minute: number, second: number);
    }
    type Primitive = string | number | boolean | undefined | null | symbol;
    namespace reference {
        const Exception: Exception;
    }
    namespace StaticTools {
        class Point2D {
            static distance(point1: type.Point2D, point2: type.Point2D): number;
        }
        class Any {
            static equals(val1: any, val2: any, deep: boolean): boolean;
        }
        class Primitive {
            static equals(val1: Primitive, val2: Primitive): boolean;
        }
        class Obj {
            static equals(obj1: any, obj2: any, deep?: boolean): boolean;
        }
        class Exception {
            static isNotException<T>(t: T | Exception): t is T;
        }
        class UUID {
            static generate(): string;
        }
        class TimeSpan {
            static fromUnixTimestamp(timestamp: number): type.TimeSpan;
            static toUnixTimestamp(timespan: type.TimeSpan): number;
        }
        class Time {
            static biggerThan(time1: type.Time, time2: type.Time): boolean;
            static equals(time1: type.Time, time2: type.Time): boolean;
            static now(): type.Time;
            static addMiliseconds(time: type.Time, miliseconds: number): type.Time;
            static addMinutes(time: type.Time, minutes: number): type.Time;
            static DayToMiliseconds(minute: number): number;
            static HourToMiliseconds(minute: number): number;
            static MinuteToMiliseconds(minute: number): number;
            static SecondToMiliseconds(minute: number): number;
            static fromJavascriptDate(date: any): type.Time;
            static toJavascriptDate(time: type.Time): any;
        }
        class Date {
            static equals(date1: type.Date, date2: type.Date): boolean;
            static biggerThan(date1: type.Date, date2: type.Date): boolean;
        }
        class Clock {
            static equals(clock1: type.Clock, clock2: type.Clock): boolean;
            static biggerThan(clock1: type.Clock, clock2: type.Clock): boolean;
        }
        class Array {
            static lastElement<T>(array: T[]): T;
            static unifySameItems<T>(array: T[], compare?: (t1: T, t2: T) => boolean): T[];
            static orderBy<T>(array: T[], compare?: (t1: T, t2: T) => boolean): void;
            static swap<T>(array: T[], index1: number, index2: number): void;
            static combine<T>(array1: T[], array2: T[]): T[];
            static equals<T, K>(array1: T[], array2: K[], compare?: (t: T, k: K) => boolean): boolean;
            static contains<T, K>(array: T[], k: K, compare?: (arrayItem: T, k: K) => boolean): boolean;
            static containsArray<T, K>(master: T[], slave: K[], compare?: (t: T, k: K) => boolean): boolean;
            static indexOf<T, K>(array: T[], k: K, compare?: (arrayItem: T, k: K) => boolean): number;
            static removeAt<T>(array: T[], index: number): T;
            static remove<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T;
            static getMatched<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T;
            static getAllMatched<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T[];
            static removeAllMatched<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T[];
        }
    }
}