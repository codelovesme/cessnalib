export declare const JavascriptDate: DateConstructor;
export declare const JavascriptObject: ObjectConstructor;
export declare namespace js {
    class Class {
        static toDotNotation(obj: Object): any;
        static clean(obj: Object): void;
        static extend(subInstance: any, parentInstance: any): void;
        static clone<T extends any>(obj: T, deep: boolean): T;
        static merge(primaryInstance: any, secondaryInstance: any): any;
        static classify(emptyInstance: any, valueObj: any): any;
        static valuefy(instance: any): any;
        static isPrimitiveType(obj: any): boolean;
        static instanceOf<T>(referenceObject: T, obj: any | T): obj is T;
        static doesCover(obj1: any, obj2: any): boolean;
        static doesMongoCover(obj: any, query: any): boolean;
    }
}
export declare namespace injection {
    class StaticTools {
        static valueOfValueChooser(valueChooser: ValueChooser): string;
    }
    class Configuration {
        values: ValueChooser[];
        objects: ObjectChooser[];
    }
    class ValueChooser {
        className: string;
        values: string[];
        index: number;
    }
    class ObjectChooser {
        class: ValueChooser;
        initialProperties: Object;
    }
}
export declare namespace sys {
    namespace type {
        class Exception {
            message: string;
            innerException: Exception;
            constructor(message: string, innerException?: Exception);
        }
        class Map<K, V> {
            private compareKeys;
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
        namespace reference {
            const Exception: Exception;
        }
        namespace StaticTools {
            class Object {
                static equals(obj1: any, obj2: any, deep?: boolean): boolean;
            }
            class Exception {
                static isNotException<T>(t: T | Exception): t is T;
            }
            class UUID {
                static generate(): string;
            }
            class TimeSpan {
                static fromUnixTimestamp(timestamp: number): sys.type.TimeSpan;
                static toUnixTimestamp(timespan: sys.type.TimeSpan): number;
            }
            class Time {
                static biggerThan(time1: sys.type.Time, time2: sys.type.Time): boolean;
                static equals(time1: sys.type.Time, time2: sys.type.Time): boolean;
                static now(): sys.type.Time;
                static addMiliseconds(time: sys.type.Time, miliseconds: number): sys.type.Time;
                static addMinutes(time: sys.type.Time, minutes: number): sys.type.Time;
                static DayToMiliseconds(minute: number): number;
                static HourToMiliseconds(minute: number): number;
                static MinuteToMiliseconds(minute: number): number;
                static SecondToMiliseconds(minute: number): number;
                static fromJavascriptDate(date: any): sys.type.Time;
                static toJavascriptDate(time: sys.type.Time): any;
            }
            class Date {
                static equals(date1: sys.type.Date, date2: sys.type.Date): boolean;
                static biggerThan(date1: sys.type.Date, date2: sys.type.Date): boolean;
            }
            class Clock {
                static equals(clock1: sys.type.Clock, clock2: sys.type.Clock): boolean;
                static biggerThan(clock1: sys.type.Clock, clock2: sys.type.Clock): boolean;
            }
            class Array {
                static orderBy<T>(array: T[], compare?: (t1: T, t2: T) => boolean): void;
                static swap<T>(array: T[], index1: number, index2: number): void;
                static combine<T>(array1: T[], array2: T[]): T[];
                static equals<T, K>(array1: T[], array2: K[], compare?: (t: T, k: K) => boolean): boolean;
                static contains<T, K>(array: T[], k: K, compare?: (arrayItem: T, k: K) => boolean): boolean;
                static containsArray<T, K>(master: T[], slave: K[], compare?: (t: T, k: K) => boolean): boolean;
                static indexOf<T, K>(array: T[], k: K, compare?: (arrayItem: T, k: K) => boolean): number;
                static removeAt<T>(array: T[], index: number): T;
                static remove<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T;
                static removeAllMatched<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T[];
            }
        }
    }
}
