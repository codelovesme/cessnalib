import { js } from "../index";

const JavascriptDate = Date;

export namespace type {
  export type HttpHeaderUnion =
    | "a-im"
    | "accept"
    | "accept-charset"
    | "accept-encoding"
    | "accept-language"
    | "accept-datetime"
    | "access-control-request-method"
    | "access-control-request-headers"
    | "authorization"
    | "cache-control"
    | "connection"
    | "content-length"
    | "content-type"
    | "cookie"
    | "date"
    | "expect"
    | "forwarded"
    | "from"
    | "host"
    | "if-match"
    | "if-modified-since"
    | "if-none-match"
    | "if-range"
    | "if-unmodified-since"
    | "max-forwards"
    | "origin"
    | "pragma"
    | "proxy-authorization"
    | "range"
    | "referer"
    | "te"
    | "user-agent"
    | "upgrade"
    | "via"
    | "Warning";

  export type Headers = { [key in HttpHeaderUnion]?: string };
  export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<RecursivePartial<U>>
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
  };
  export class Observable<T> {
    private listeners: Callback<T>[] = [];
    constructor(run: (publish: (data: T) => void) => void) {
      run((data: T) => {
        for (const listener of this.listeners) {
          listener(data);
        }
      });
    }

    public subscribe(callback: Callback<T>) {
      this.listeners.push(callback);
    }
  }
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
    (t: T | Exception): void;
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
  export class Point2D {
    className: string = "cessnalib.type.Point2D";
    constructor(public x: number, public y: number) { }
  }
  export class TimeSpan {
    className: string = "cessnalib.type.TimeSpan";
    constructor(
      public days: number,
      public hours: number,
      public minutes: number,
      public seconds: number,
      public miliseconds: number
    ) { }
  }
  export class Time implements Classifiable {
    className: string = "cessnalib.type.Time";
    constructor(public date: Date, public clock: Clock) { }
  }
  export class Date implements Classifiable {
    className: string = "cessnalib.type.Date";
    constructor(
      public year: number,
      public month: number,
      public day: number
    ) { }
  }
  export class Clock implements Classifiable {
    className: string = "cessnalib.type.Clock";
    constructor(
      public hour: number,
      public minute: number,
      public second: number
    ) { }
  }
  export type Primitive =
    | string
    | number
    | boolean
    | undefined
    | null
    | symbol;
  export namespace reference {
    export const Exception = new type.Exception("Exception", null);
  }
  export namespace StaticTools {
    export class Point2D {
      public static distance(point1: type.Point2D, point2: type.Point2D) {
        return Math.sqrt(
          Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
        );
      }
    }
    export class Any {
      public static equals(val1: any, val2: any, deep: boolean) {
        return (
          (js.Class.isPrimitiveType(val1) &&
            js.Class.isPrimitiveType(val2) &&
            Primitive.equals(val1, val2)) ||
          (!js.Class.isPrimitiveType(val1) &&
            !js.Class.isPrimitiveType(val2) &&
            Obj.equals(val1, val2, deep))
        );
      }
    }
    export class Primitive {
      public static equals(val1: Primitive, val2: Primitive) {
        return val1 === val2;
      }
    }
    export class Obj {
      public static equals(obj1: any, obj2: any, deep?: boolean) {
        if (!obj1 && !obj2) {
          return true;
        }
        if (!obj1 || !obj2) {
          return false;
        }
        let obj1keys = Object.keys(obj1);
        let obj2keys = Object.keys(obj2);
        if (!Array.equals(obj1keys, obj2keys)) return false;
        if (obj1keys.length == 0) return true;
        if (deep) {
          for (let key of obj1keys) {
            if (typeof obj1[key] == "object") {
              if (!Obj.equals(obj1[key], obj2[key], deep)) return false;
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
        return (
          word() +
          word() +
          "-" +
          word() +
          "-" +
          word() +
          "-" +
          word() +
          "-" +
          word() +
          word() +
          word()
        );
      }
    }
    export class TimeSpan {
      public static fromUnixTimestamp(timestamp: number): type.TimeSpan {
        var days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
        timestamp -= days * (1000 * 60 * 60 * 24);

        var hours = Math.floor(timestamp / (1000 * 60 * 60));
        timestamp -= hours * (1000 * 60 * 60);

        var minutes = Math.floor(timestamp / (1000 * 60));
        timestamp -= minutes * (1000 * 60);

        var seconds = Math.floor(timestamp / 1000);
        timestamp -= seconds * 1000;

        var miliseconds = timestamp;

        return new type.TimeSpan(
          days,
          hours,
          minutes,
          seconds,
          miliseconds
        );
      }
      public static toUnixTimestamp(timespan: type.TimeSpan): number {
        let fromdays = timespan.days * 60 * 60 * 24 * 1000;
        let fromhours = timespan.hours * 60 * 60 * 1000;
        let fromminutes = timespan.minutes * 60 * 1000;
        let fromseconds = timespan.seconds * 1000;
        let frommiliseconds = timespan.miliseconds;
        return (
          fromdays + fromhours + fromminutes + fromseconds + frommiliseconds
        );
      }
    }
    export class Time {
      public static biggerThan(
        time1: type.Time,
        time2: type.Time
      ): boolean {
        return Date.biggerThan(time1.date, time2.date)
          ? true
          : Date.biggerThan(time1.date, time2.date)
            ? false
            : Clock.biggerThan(time1.clock, time2.clock);
      }
      public static equals(
        time1: type.Time,
        time2: type.Time
      ): boolean {
        return (
          Date.equals(time1.date, time2.date) &&
          Clock.equals(time1.clock, time2.clock)
        );
      }
      public static now(): type.Time {
        let newDate = new JavascriptDate();
        return new type.Time(
          new type.Date(
            newDate.getUTCFullYear(),
            newDate.getUTCMonth() + 1,
            newDate.getUTCDate()
          ),
          new type.Clock(
            newDate.getUTCHours(),
            newDate.getUTCMinutes(),
            newDate.getUTCSeconds()
          )
        );
      }
      public static addMiliseconds(
        time: type.Time,
        miliseconds: number
      ): type.Time {
        return Time.fromJavascriptDate(
          new JavascriptDate(
            Time.toJavascriptDate(time).getTime() + miliseconds
          )
        );
      }
      public static addMinutes(
        time: type.Time,
        minutes: number
      ): type.Time {
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
      public static fromJavascriptDate(date: any): type.Time {
        return new type.Time(
          new type.Date(
            date.getUTCFullYear(),
            date.getUTCMonth() + 1,
            date.getUTCDate()
          ),
          new type.Clock(
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          )
        );
      }
      public static toJavascriptDate(time: type.Time): any {
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
      public static equals(
        date1: type.Date,
        date2: type.Date
      ): boolean {
        return (
          date1.year == date2.year &&
          date1.month == date2.month &&
          date1.day == date2.day
        );
      }
      public static biggerThan(
        date1: type.Date,
        date2: type.Date
      ): boolean {
        return date1.year > date2.year
          ? true
          : date1.year < date2.year
            ? false
            : date1.month > date2.month
              ? true
              : date1.month < date2.month
                ? false
                : date1.day > date2.day;
      }
    }
    export class Clock {
      public static equals(
        clock1: type.Clock,
        clock2: type.Clock
      ): boolean {
        return (
          clock1.hour == clock2.hour &&
          clock1.minute == clock2.minute &&
          clock1.second == clock2.second
        );
      }
      public static biggerThan(
        clock1: type.Clock,
        clock2: type.Clock
      ): boolean {
        return clock1.hour > clock2.hour
          ? true
          : clock1.hour < clock2.hour
            ? false
            : clock1.minute > clock2.minute
              ? true
              : clock1.minute < clock2.minute
                ? false
                : clock1.second > clock2.second;
      }
    }
    export class Array {
      public static lastElement<T>(array: T[]) {
        return array[array.length - 1];
      }
      public static unifySameItems<T>(
        array: T[],
        compare = (t1: T, t2: T) => t1 === t2
      ) {
        let ret: T[] = [];
        for (let item of array) {
          if (!type.StaticTools.Array.contains(ret, item, compare)) {
            ret.push(item);
          }
        }
        return ret;
      }
      public static orderBy<T>(
        array: T[],
        compare?: (t1: T, t2: T) => boolean
      ) {
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
            if (a[i] === a[j]) a.splice(j--, 1);
          }
        }
        return a;
      }
      public static equals<T, K>(
        array1: T[],
        array2: K[],
        compare?: (t: T, k: K) => boolean
      ): boolean {
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
      public static contains<T, K>(
        array: T[],
        k: K,
        compare?: (arrayItem: T, k: K) => boolean
      ): boolean {
        return Array.indexOf(array, k, compare) >= 0;
      }
      public static containsArray<T, K>(
        master: T[],
        slave: K[],
        compare?: (t: T, k: K) => boolean
      ): boolean {
        for (let s of slave) {
          if (!Array.contains(master, s, compare)) return false;
        }
        return true;
      }
      public static indexOf<T, K>(
        array: T[],
        k: K,
        compare?: (arrayItem: T, k: K) => boolean
      ): number {
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
      public static remove<T, K>(
        array: T[],
        k: K,
        compare?: (arrayItem: T, t: K) => boolean
      ): T {
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
      public static getMatched<T, K>(
        array: T[],
        k: K,
        compare = (arrayItem: T, t: K) => (arrayItem as any) === t
      ): T {
        let ret;
        for (let i = 0; i < array.length; i++) {
          if (compare(array[i], k)) {
            ret = array[i];
            break;
          }
        }
        return ret;
      }
      public static getAllMatched<T, K>(
        array: T[],
        k: K,
        compare?: (arrayItem: T, t: K) => boolean
      ): T[] {
        let returnValue: T[] = [];
        if (compare) {
          for (let i = 0; i < array.length; i++) {
            if (compare(array[i], k)) {
              returnValue.push(array[i]);
            }
          }
        } else {
          for (let i = 0; i < array.length; i++) {
            if ((array[i] as any) == k) {
              returnValue.push(array[i]);
            }
          }
        }
        return returnValue;
      }
      public static removeAllMatched<T, K>(
        array: T[],
        k: K,
        compare?: (arrayItem: T, t: K) => boolean
      ): T[] {
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
