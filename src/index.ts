
import * as sift from "sift";
export const JavascriptDate = Date;
export const JavascriptObject = Object;

export namespace js {
    export class Class {
        public static toDotNotation(obj: Object) {
            let obj_ = obj as any;
            //check if obj is object or not
            if (!obj && typeof obj !== "object") return obj;
            //if the obj terminal then return itself
            let ret_: any = {};
            for (let key in obj) {
                if (!Class.isPrimitiveType(obj_[key])) {
                    let r = Class.toDotNotation(obj_[key]);
                    for (let k in r) {
                        ret_[key + "." + k] = r[k];
                    }
                } else {
                    ret_[key] = obj_[key];
                }
            }
            return ret_;
        }
        public static clean(obj: Object): void {
            delete (obj as any).__proto__;
        }
        public static extend(subInstance: any, parentInstance: any): void {
            for (let prop in parentInstance) {
                if (!subInstance[prop]) subInstance[prop] = parentInstance[prop];
            }
            return subInstance;
        }
        public static clone<T extends any>(obj: T, deep: boolean): T {
            var sub: any = {};
            for (var prop in obj) {
                sub[prop] = (deep && ('object' === typeof obj[prop])) ? Class.clone(obj[prop], true) : obj[prop];
            }
            return <T>sub;
        }
        public static merge(primaryInstance: any, secondaryInstance: any) {
            for (var prop in secondaryInstance) {
                if (!primaryInstance[prop]) primaryInstance[prop] = secondaryInstance[prop];
            }
            return primaryInstance;
        }
        public static classify(emptyInstance: any, valueObj: any) {
            for (var prop in emptyInstance) {
                if (("function" !== typeof emptyInstance[prop]) && !emptyInstance[prop]) emptyInstance[prop] = valueObj[prop];
            }
            return emptyInstance;
        }
        public static valuefy(instance: any) {
            var valueObj: any = {};
            var propToValuefy: any = null;
            for (var prop in instance) {
                if ("function" !== typeof instance[prop]) {
                    valueObj[prop] = instance[prop];
                } else if (typeof instance[prop] === "object") {
                    valueObj[prop] = Class.valuefy(instance[prop]);
                } else if ((prop.substring(0, 3) === "get") && (propToValuefy = prop.substring(3, prop.length))) {
                    valueObj[propToValuefy[0].toLowerCase() + propToValuefy.substring(1, propToValuefy.length)] = instance[prop]();
                }
            }
            return valueObj;
        }
        public static isPrimitiveType(obj: any): boolean {
            return typeof obj === "string" ||
                typeof obj === "number" ||
                typeof obj === "boolean" ||
                obj === undefined ||
                obj === null ||
                typeof obj === "symbol";
        }
        public static instanceOf<T>(referenceObject: T, obj: any | T): obj is T {
            if (obj === null || obj === undefined) return false;
            if (Class.isPrimitiveType(referenceObject)) return typeof referenceObject === typeof obj;
            for (var prop in referenceObject) {
                if (obj[prop] === undefined)
                    return false;
            }
            return true;
        }
        ///TODO must be upgraded
        public static doesCover(obj1: any, obj2: any): boolean {
            for (let key in obj2) {
                if (obj2[key] === null || obj2[key] === undefined) continue;
                if (obj1[key] === undefined || obj1[key] === null) return false;
                if (Class.isPrimitiveType(obj2[key])) {
                    if (obj1[key] !== obj2[key]) return false;
                } else {
                    if (!Class.doesCover(obj1[key], obj2[key])) return false;
                }
            }
            return true;
        }
        public static doesMongoCover(obj: any, query: any): boolean {
            let array = sift(query, [obj]);
            return array instanceof Array && array.length > 0;
        }
    }
}
export namespace injection {
    export class StaticTools {
        public static valueOfValueChooser(valueChooser: ValueChooser): string {
            return valueChooser.values[valueChooser.index];
        }
    }
    export class Configuration {
        public values: ValueChooser[];
        public objects: ObjectChooser[];
    }
    export class ValueChooser {
        public className: string;
        public values: string[];
        public index: number = 0;
    }
    export class ObjectChooser {
        public class: ValueChooser;
        public initialProperties: Object;
    }
}
export namespace sys {
    export namespace type {
        export class Exception {
            constructor(public message: string, public innerException?: Exception) { }
        }
        export class Map<K, V> {
            private keys = new Array<K>();
            private values = new Array<V>();
            constructor(private compareKeys?: (key1: K, key2: K) => boolean) { }
            public add(key: K, value: V): void {
                if (!this.get(key)) {
                    this.keys.push(key);
                    this.values.push(value);
                } else {
                    throw "KeyAlreadyExistException";
                }
            }
            public keyExists(key: K): boolean {
                return this.indexOf(key) >= 0;
            }
            public set(key: K, value: V): void {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this.values[index] = value;
                } else {
                    this.keys.push(key);
                    this.values.push(value);
                }
            }
            public remove(key: K): void {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this.keys.slice(index, 1);
                    this.values.slice(index, 1);
                }

            }
            public indexOf(key: K): number {
                let index = -1;
                if (this.compareKeys) {
                    this.keys.forEach((k: K) => {
                        if (this.compareKeys(k, key)) {
                            index = this.keys.indexOf(k);
                        }
                    });
                } else {
                    index = this.keys.indexOf(key);
                }
                return index;
            }
            public get(key: K): V {
                return this.values[this.indexOf(key)];
            }
            public getKeys(): K[] {
                return this.keys;
            }
            public getValues(): V[] {
                return this.values;
            }
        }
        export interface Callback<T> {
            (t: T | Exception): void
        }
        export interface Classifiable {
            className: string;
        }
        export interface Identifiable {
            id: string;
        }
        export interface Named {
            name: string;
        }
        export class TimeSpan {
            className: string = "sys.type.TimeSpan";
            constructor(public days: number, public hours: number, public minutes: number, public seconds: number, public miliseconds: number) { }
        }
        export class Time implements Classifiable {
            className: string = "sys.type.Time";
            constructor(public date: Date, public clock: Clock) { }
        }
        export class Date implements Classifiable {
            className: string = "sys.type.Date";
            constructor(public year: number, public month: number, public day: number) { }
        }
        export class Clock implements Classifiable {
            className: string = "sys.type.Clock";
            constructor(public hour: number, public minute: number, public second: number) { }
        }
        export namespace reference {
            export const Exception = new sys.type.Exception("Exception", null);
        }
        export namespace StaticTools {
            export class Object {
                public static equals(obj1: any, obj2: any, deep?: boolean) {
                    let obj1keys = JavascriptObject.keys(obj1);
                    let obj2keys = JavascriptObject.keys(obj2);
                    if (!Array.equals(obj1keys, obj2keys)) return false;
                    if (obj1keys.length == 0) return true;
                    if (deep) {
                        for (let key of obj1keys) {
                            if (typeof obj1[key] == "object") {
                                if (!Object.equals(obj1[key], obj2[key], deep)) return false;
                            } else {
                                if (obj1[key] != obj2[key]) return false;
                            }
                        }
                    } else {
                        for (let key of obj1keys) {
                            if (obj1[key] != obj2[key]) return false;
                        }
                    }
                    return true;
                }
            }
            export class Exception {
                public static isNotException<T>(t: T | Exception): t is T {
                    return !js.Class.instanceOf(reference.Exception, t);
                }
            }
            export class UUID {
                public static generate(): string {
                    function word() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }
                    return word() + word() + '-' + word() + '-' + word() + '-' +
                        word() + '-' + word() + word() + word();
                }
            }
            export class TimeSpan {
                public static fromUnixTimestamp(timestamp: number): sys.type.TimeSpan {
                    timestamp *= 1000;
                    var days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
                    timestamp -= days * (1000 * 60 * 60 * 24);

                    var hours = Math.floor(timestamp / (1000 * 60 * 60));
                    timestamp -= hours * (1000 * 60 * 60);

                    var minutes = Math.floor(timestamp / (1000 * 60));
                    timestamp -= minutes * (1000 * 60);

                    var seconds = Math.floor(timestamp / 1000);
                    timestamp -= seconds * 1000;

                    var miliseconds = timestamp;

                    return new sys.type.TimeSpan(days, hours, minutes, seconds, miliseconds);
                }
                public static toUnixTimestamp(timespan: sys.type.TimeSpan): number {
                    let fromdays = timespan.days * 60 * 60 * 24;
                    let fromhours = timespan.hours * 60 * 60;
                    let fromminutes = timespan.minutes * 60;
                    let fromseconds = timespan.seconds;
                    let frommiliseconds = timespan.miliseconds / 1000;
                    return fromdays + fromhours + fromminutes + fromseconds + frommiliseconds;
                }
            }
            export class Time {
                public static biggerThan(time1: sys.type.Time, time2: sys.type.Time): boolean {
                    return Date.biggerThan(time1.date, time2.date) ? true :
                        Date.biggerThan(time1.date, time2.date) ? false :
                            Clock.biggerThan(time1.clock, time2.clock);
                }
                public static equals(time1: sys.type.Time, time2: sys.type.Time): boolean {
                    return Date.equals(time1.date, time2.date) && Clock.equals(time1.clock, time2.clock);
                }
                public static now(): sys.type.Time {
                    let newDate = new JavascriptDate();
                    return new sys.type.Time(new sys.type.Date(newDate.getUTCFullYear(), newDate.getUTCMonth() + 1, newDate.getUTCDate()),
                        new sys.type.Clock(newDate.getUTCHours(), newDate.getUTCMinutes(), newDate.getUTCSeconds()));
                }
                public static addMiliseconds(time: sys.type.Time, miliseconds: number): sys.type.Time {
                    return Time.fromJavascriptDate(new JavascriptDate(
                        Time.toJavascriptDate(time).getTime() + miliseconds));
                }
                public static addMinutes(time: sys.type.Time, minutes: number): sys.type.Time {
                    let miliseconds = minutes * 60000;
                    return Time.addMiliseconds(time, miliseconds);
                }
                public static DayToMiliseconds(minute: number): number {
                    return minute * 86400000;
                }
                public static HourToMiliseconds(minute: number): number {
                    return minute * 3600000;
                }
                public static MinuteToMiliseconds(minute: number): number {
                    return minute * 60000;
                }
                public static SecondToMiliseconds(minute: number): number {
                    return minute * 1000;
                }
                public static fromJavascriptDate(date: any): sys.type.Time {
                    return new sys.type.Time(new sys.type.Date(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()),
                        new sys.type.Clock(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
                }
                public static toJavascriptDate(time: sys.type.Time): any {
                    let date = new JavascriptDate();
                    date.setUTCFullYear(time.date.year);
                    date.setUTCMonth(time.date.month - 1);
                    date.setUTCDate(time.date.day);
                    date.setUTCHours(time.clock.hour);
                    date.setUTCMinutes(time.clock.minute);
                    date.setUTCSeconds(time.clock.second);
                    return date;
                }
            }
            export class Date {
                public static equals(date1: sys.type.Date, date2: sys.type.Date): boolean {
                    return date1.year == date2.year &&
                        date1.month == date2.month &&
                        date1.day == date2.day;
                }
                public static biggerThan(date1: sys.type.Date, date2: sys.type.Date): boolean {
                    return date1.year > date2.year ? true : date1.year < date2.year ? false :
                        date1.month > date2.month ? true : date1.month < date2.month ? false :
                            date1.day > date2.day;
                }
            }
            export class Clock {
                public static equals(clock1: sys.type.Clock, clock2: sys.type.Clock): boolean {
                    return clock1.hour == clock2.hour &&
                        clock1.minute == clock2.minute &&
                        clock1.second == clock2.second;
                }
                public static biggerThan(clock1: sys.type.Clock, clock2: sys.type.Clock): boolean {
                    return clock1.hour > clock2.hour ? true : clock1.hour < clock2.hour ? false :
                        clock1.minute > clock2.minute ? true : clock1.minute < clock2.minute ? false :
                            clock1.second > clock2.second;
                }
            }
            export class Array {
                public static orderBy<T>(array: T[], compare?: (t1: T, t2: T) => boolean) {
                    for (let i = 0; i < array.length - 1; i++) {
                        for (let j = i + 1; j < array.length; j++) {
                            if (compare(array[i], array[j])) {
                                Array.swap(array, i, j);
                            }
                        }
                    }
                }
                public static swap<T>(array: T[], index1: number, index2: number) {
                    let temp = array[index1];
                    array[index1] = array[index2];
                    array[index2] = temp;
                }
                public static combine<T>(array1: T[], array2: T[]): T[] {
                    let a = array1.concat(array2);
                    for (var i = 0; i < a.length; ++i) {
                        for (var j = i + 1; j < a.length; ++j) {
                            if (a[i] === a[j])
                                a.splice(j--, 1);
                        }
                    }
                    return a;
                }
                public static equals<T, K>(array1: T[], array2: K[], compare?: (t: T, k: K) => boolean): boolean {
                    if (!array1 && !array2) return true;
                    if (!array1 || !array2) return false;
                    if (array1.length !== array2.length) return false;
                    if (compare) {
                        for (let i = 0; i < array1.length; i++) {
                            if (!compare(array1[i], array2[i])) return false;
                        }
                    } else {
                        for (let i = 0; i < array1.length; i++) {
                            if ((array1[i] as any) !== array2[i]) return false;
                        }
                    }
                    return true;
                }
                public static contains<T, K>(array: T[], k: K, compare?: (arrayItem: T, k: K) => boolean): boolean {
                    return Array.indexOf(array, k, compare) >= 0;
                }
                public static containsArray<T, K>(master: T[], slave: K[], compare?: (t: T, k: K) => boolean): boolean {
                    for (let s of slave) {
                        if (!Array.contains(master, s, compare)) return false;
                    }
                    return true;
                }
                public static indexOf<T, K>(array: T[], k: K, compare?: (arrayItem: T, k: K) => boolean): number {
                    if (compare) {
                        for (var i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                return i;
                            }
                        }
                    } else {
                        for (var i = 0; i < array.length; i++) {
                            if ((array[i] as any) === k) {
                                return i;
                            }
                        }
                    }
                    return -1;
                }
                public static removeAt<T>(array: T[], index: number): T {
                    return array.splice(index, 1)[0];
                }
                public static remove<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T {
                    if (compare) {
                        for (let i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                return array.splice(i, 1)[0];
                            }
                        }
                    } else {
                        for (let i = 0; i < array.length; i++) {
                            if ((array[i] as any) == k) {
                                return array.splice(i, 1)[0];
                            }
                        }
                    }
                }
                public static removeAllMatched<T, K>(array: T[], k: K, compare?: (arrayItem: T, t: K) => boolean): T[] {
                    let returnValue: T[] = [];
                    if (compare) {
                        for (let i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                returnValue.push(array.splice(i, 1)[0]);
                                i--;
                            }
                        }
                    } else {
                        for (let i = 0; i < array.length; i++) {
                            if ((array[i] as any) == k) {
                                returnValue.push(array.splice(i, 1)[0]);
                                i--;
                            }
                        }
                    }
                    return returnValue;
                }
            }
        }
    }
}