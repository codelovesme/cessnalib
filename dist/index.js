import * as sift from "sift";
export const JavascriptDate = Date;
export var js;
(function (js) {
    class Class {
        static toDotNotation(obj) {
            let obj_ = obj;
            //check if obj is object or not
            if (!obj && typeof obj !== "object")
                return obj;
            //if the obj terminal then return itself
            let ret_ = {};
            for (let key in obj) {
                if (!Class.isPrimitiveType(obj_[key])) {
                    let r = Class.toDotNotation(obj_[key]);
                    for (let k in r) {
                        ret_[key + "." + k] = r[k];
                    }
                }
                else {
                    ret_[key] = obj_[key];
                }
            }
            return ret_;
        }
        static clean(obj) {
            delete obj.__proto__;
        }
        static extend(subInstance, parentInstance) {
            for (let prop in parentInstance) {
                if (!subInstance[prop])
                    subInstance[prop] = parentInstance[prop];
            }
            return subInstance;
        }
        static clone(obj, deep) {
            if (this.isPrimitiveType(obj))
                return obj;
            if (obj instanceof Array) {
                let sub = [];
                for (let item of obj) {
                    sub.push(Class.clone(item, true));
                }
                return sub;
            }
            else {
                var sub = {};
                for (var prop in obj) {
                    sub[prop] =
                        deep && "object" === typeof obj[prop]
                            ? Class.clone(obj[prop], true)
                            : obj[prop];
                }
                return sub;
            }
        }
        static merge(primaryInstance, secondaryInstance) {
            for (var prop in secondaryInstance) {
                if (!primaryInstance[prop])
                    primaryInstance[prop] = secondaryInstance[prop];
            }
            return primaryInstance;
        }
        static patch(source, patch) {
            let obj = Class.clone(source, true);
            for (let key in patch) {
                if (Class.isPrimitiveType(obj[key])) {
                    obj[key] = patch[key];
                }
                else {
                    obj[key] = Class.patch(obj[key], patch[key]);
                }
            }
            return obj;
        }
        static classify(emptyInstance, valueObj) {
            for (var prop in emptyInstance) {
                if ("function" !== typeof emptyInstance[prop] && !emptyInstance[prop])
                    emptyInstance[prop] = valueObj[prop];
            }
            return emptyInstance;
        }
        static valuefy(instance) {
            var valueObj = {};
            var propToValuefy = null;
            for (var prop in instance) {
                if ("function" !== typeof instance[prop]) {
                    valueObj[prop] = instance[prop];
                }
                else if (typeof instance[prop] === "object") {
                    valueObj[prop] = Class.valuefy(instance[prop]);
                }
                else if (prop.substring(0, 3) === "get" &&
                    (propToValuefy = prop.substring(3, prop.length))) {
                    valueObj[propToValuefy[0].toLowerCase() +
                        propToValuefy.substring(1, propToValuefy.length)] = instance[prop]();
                }
            }
            return valueObj;
        }
        static isPrimitiveType(obj) {
            return (typeof obj === "string" ||
                typeof obj === "number" ||
                typeof obj === "boolean" ||
                obj === undefined ||
                obj === null ||
                typeof obj === "symbol");
        }
        static instanceOf(referenceObject, obj) {
            if (obj === null || obj === undefined)
                return false;
            if (Class.isPrimitiveType(referenceObject))
                return typeof referenceObject === typeof obj;
            for (var prop in referenceObject) {
                if (obj[prop] === undefined)
                    return false;
            }
            return true;
        }
        ///TODO must be upgraded
        static doesCover(obj1, obj2) {
            for (let key in obj2) {
                if (obj2[key] === null || obj2[key] === undefined)
                    continue;
                if (obj1[key] === undefined || obj1[key] === null)
                    return false;
                if (Class.isPrimitiveType(obj2[key])) {
                    if (obj1[key] !== obj2[key])
                        return false;
                }
                else {
                    if (!Class.doesCover(obj1[key], obj2[key]))
                        return false;
                }
            }
            return true;
        }
        static doesMongoCover(obj, query) {
            let array = sift.default(query, [obj]);
            return array instanceof Array && array.length > 0;
        }
    }
    js.Class = Class;
})(js || (js = {}));
export var injection;
(function (injection) {
    class StaticTools {
        static valueOfValueChooser(valueChooser) {
            return valueChooser.values[valueChooser.index];
        }
    }
    injection.StaticTools = StaticTools;
    class Configuration {
    }
    injection.Configuration = Configuration;
    class ValueChooser {
        constructor() {
            this.index = 0;
        }
    }
    injection.ValueChooser = ValueChooser;
    class ObjectChooser {
    }
    injection.ObjectChooser = ObjectChooser;
})(injection || (injection = {}));
export var sys;
(function (sys) {
    let type;
    (function (type) {
        class Observable {
            constructor(run) {
                this.listeners = [];
                run((data) => {
                    for (const listener of this.listeners) {
                        listener(data);
                    }
                });
            }
            subscribe(callback) {
                this.listeners.push(callback);
            }
        }
        type.Observable = Observable;
        class Exception {
            constructor(message, innerException) {
                this.message = message;
                this.innerException = innerException;
            }
        }
        type.Exception = Exception;
        class Map {
            constructor(compareKeys) {
                this.compareKeys = compareKeys;
                this.keys = new Array();
                this.values = new Array();
            }
            add(key, value) {
                if (!this.get(key)) {
                    this.keys.push(key);
                    this.values.push(value);
                }
                else {
                    throw "KeyAlreadyExistException";
                }
            }
            keyExists(key) {
                return this.indexOf(key) >= 0;
            }
            set(key, value) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this.values[index] = value;
                }
                else {
                    this.keys.push(key);
                    this.values.push(value);
                }
            }
            remove(key) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this.keys.slice(index, 1);
                    this.values.slice(index, 1);
                }
            }
            indexOf(key) {
                let index = -1;
                if (this.compareKeys) {
                    this.keys.forEach((k) => {
                        if (this.compareKeys(k, key)) {
                            index = this.keys.indexOf(k);
                        }
                    });
                }
                else {
                    index = this.keys.indexOf(key);
                }
                return index;
            }
            get(key) {
                return this.values[this.indexOf(key)];
            }
            getKeys() {
                return this.keys;
            }
            getValues() {
                return this.values;
            }
        }
        type.Map = Map;
        class Point2D {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.className = "sys.type.Point2D";
            }
        }
        type.Point2D = Point2D;
        class TimeSpan {
            constructor(days, hours, minutes, seconds, miliseconds) {
                this.days = days;
                this.hours = hours;
                this.minutes = minutes;
                this.seconds = seconds;
                this.miliseconds = miliseconds;
                this.className = "sys.type.TimeSpan";
            }
        }
        type.TimeSpan = TimeSpan;
        class Time {
            constructor(date, clock) {
                this.date = date;
                this.clock = clock;
                this.className = "sys.type.Time";
            }
        }
        type.Time = Time;
        class Date {
            constructor(year, month, day) {
                this.year = year;
                this.month = month;
                this.day = day;
                this.className = "sys.type.Date";
            }
        }
        type.Date = Date;
        class Clock {
            constructor(hour, minute, second) {
                this.hour = hour;
                this.minute = minute;
                this.second = second;
                this.className = "sys.type.Clock";
            }
        }
        type.Clock = Clock;
        let reference;
        (function (reference) {
            reference.Exception = new sys.type.Exception("Exception", null);
        })(reference = type.reference || (type.reference = {}));
        let StaticTools;
        (function (StaticTools) {
            class Point2D {
                static distance(point1, point2) {
                    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
                }
            }
            StaticTools.Point2D = Point2D;
            class Any {
                static equals(val1, val2, deep) {
                    return ((js.Class.isPrimitiveType(val1) &&
                        js.Class.isPrimitiveType(val2) &&
                        Primitive.equals(val1, val2)) ||
                        (!js.Class.isPrimitiveType(val1) &&
                            !js.Class.isPrimitiveType(val2) &&
                            Obj.equals(val1, val2, deep)));
                }
            }
            StaticTools.Any = Any;
            class Primitive {
                static equals(val1, val2) {
                    return val1 === val2;
                }
            }
            StaticTools.Primitive = Primitive;
            class Obj {
                static equals(obj1, obj2, deep) {
                    if (!obj1 && !obj2) {
                        return true;
                    }
                    if (!obj1 || !obj2) {
                        return false;
                    }
                    let obj1keys = Object.keys(obj1);
                    let obj2keys = Object.keys(obj2);
                    if (!Array.equals(obj1keys, obj2keys))
                        return false;
                    if (obj1keys.length == 0)
                        return true;
                    if (deep) {
                        for (let key of obj1keys) {
                            if (typeof obj1[key] == "object") {
                                if (!Obj.equals(obj1[key], obj2[key], deep))
                                    return false;
                            }
                            else {
                                if (obj1[key] != obj2[key])
                                    return false;
                            }
                        }
                    }
                    else {
                        for (let key of obj1keys) {
                            if (obj1[key] != obj2[key])
                                return false;
                        }
                    }
                    return true;
                }
            }
            StaticTools.Obj = Obj;
            class Exception {
                static isNotException(t) {
                    return !js.Class.instanceOf(reference.Exception, t);
                }
            }
            StaticTools.Exception = Exception;
            class UUID {
                static generate() {
                    function word() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }
                    return (word() +
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
                        word());
                }
            }
            StaticTools.UUID = UUID;
            class TimeSpan {
                static fromUnixTimestamp(timestamp) {
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
                static toUnixTimestamp(timespan) {
                    let fromdays = timespan.days * 60 * 60 * 24 * 1000;
                    let fromhours = timespan.hours * 60 * 60 * 1000;
                    let fromminutes = timespan.minutes * 60 * 1000;
                    let fromseconds = timespan.seconds * 1000;
                    let frommiliseconds = timespan.miliseconds;
                    return (fromdays + fromhours + fromminutes + fromseconds + frommiliseconds);
                }
            }
            StaticTools.TimeSpan = TimeSpan;
            class Time {
                static biggerThan(time1, time2) {
                    return Date.biggerThan(time1.date, time2.date)
                        ? true
                        : Date.biggerThan(time1.date, time2.date)
                            ? false
                            : Clock.biggerThan(time1.clock, time2.clock);
                }
                static equals(time1, time2) {
                    return (Date.equals(time1.date, time2.date) &&
                        Clock.equals(time1.clock, time2.clock));
                }
                static now() {
                    let newDate = new JavascriptDate();
                    return new sys.type.Time(new sys.type.Date(newDate.getUTCFullYear(), newDate.getUTCMonth() + 1, newDate.getUTCDate()), new sys.type.Clock(newDate.getUTCHours(), newDate.getUTCMinutes(), newDate.getUTCSeconds()));
                }
                static addMiliseconds(time, miliseconds) {
                    return Time.fromJavascriptDate(new JavascriptDate(Time.toJavascriptDate(time).getTime() + miliseconds));
                }
                static addMinutes(time, minutes) {
                    let miliseconds = minutes * 60000;
                    return Time.addMiliseconds(time, miliseconds);
                }
                static DayToMiliseconds(minute) {
                    return minute * 86400000;
                }
                static HourToMiliseconds(minute) {
                    return minute * 3600000;
                }
                static MinuteToMiliseconds(minute) {
                    return minute * 60000;
                }
                static SecondToMiliseconds(minute) {
                    return minute * 1000;
                }
                static fromJavascriptDate(date) {
                    return new sys.type.Time(new sys.type.Date(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()), new sys.type.Clock(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
                }
                static toJavascriptDate(time) {
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
            StaticTools.Time = Time;
            class Date {
                static equals(date1, date2) {
                    return (date1.year == date2.year &&
                        date1.month == date2.month &&
                        date1.day == date2.day);
                }
                static biggerThan(date1, date2) {
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
            StaticTools.Date = Date;
            class Clock {
                static equals(clock1, clock2) {
                    return (clock1.hour == clock2.hour &&
                        clock1.minute == clock2.minute &&
                        clock1.second == clock2.second);
                }
                static biggerThan(clock1, clock2) {
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
            StaticTools.Clock = Clock;
            class Array {
                static lastElement(array) {
                    return array[array.length - 1];
                }
                static unifySameItems(array, compare = (t1, t2) => t1 === t2) {
                    let ret = [];
                    for (let item of array) {
                        if (!sys.type.StaticTools.Array.contains(ret, item, compare)) {
                            ret.push(item);
                        }
                    }
                    return ret;
                }
                static orderBy(array, compare) {
                    for (let i = 0; i < array.length - 1; i++) {
                        for (let j = i + 1; j < array.length; j++) {
                            if (compare(array[i], array[j])) {
                                Array.swap(array, i, j);
                            }
                        }
                    }
                }
                static swap(array, index1, index2) {
                    let temp = array[index1];
                    array[index1] = array[index2];
                    array[index2] = temp;
                }
                static combine(array1, array2) {
                    let a = array1.concat(array2);
                    for (var i = 0; i < a.length; ++i) {
                        for (var j = i + 1; j < a.length; ++j) {
                            if (a[i] === a[j])
                                a.splice(j--, 1);
                        }
                    }
                    return a;
                }
                static equals(array1, array2, compare) {
                    if (!array1 && !array2)
                        return true;
                    if (!array1 || !array2)
                        return false;
                    if (array1.length !== array2.length)
                        return false;
                    if (compare) {
                        for (let i = 0; i < array1.length; i++) {
                            if (!compare(array1[i], array2[i]))
                                return false;
                        }
                    }
                    else {
                        for (let i = 0; i < array1.length; i++) {
                            if (array1[i] !== array2[i])
                                return false;
                        }
                    }
                    return true;
                }
                static contains(array, k, compare) {
                    return Array.indexOf(array, k, compare) >= 0;
                }
                static containsArray(master, slave, compare) {
                    for (let s of slave) {
                        if (!Array.contains(master, s, compare))
                            return false;
                    }
                    return true;
                }
                static indexOf(array, k, compare) {
                    if (compare) {
                        for (var i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                return i;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < array.length; i++) {
                            if (array[i] === k) {
                                return i;
                            }
                        }
                    }
                    return -1;
                }
                static removeAt(array, index) {
                    return array.splice(index, 1)[0];
                }
                static remove(array, k, compare) {
                    if (compare) {
                        for (let i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                return array.splice(i, 1)[0];
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < array.length; i++) {
                            if (array[i] == k) {
                                return array.splice(i, 1)[0];
                            }
                        }
                    }
                }
                static getMatched(array, k, compare = (arrayItem, t) => arrayItem === t) {
                    let ret;
                    for (let i = 0; i < array.length; i++) {
                        if (compare(array[i], k)) {
                            ret = array[i];
                            break;
                        }
                    }
                    return ret;
                }
                static getAllMatched(array, k, compare) {
                    let returnValue = [];
                    if (compare) {
                        for (let i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                returnValue.push(array[i]);
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < array.length; i++) {
                            if (array[i] == k) {
                                returnValue.push(array[i]);
                            }
                        }
                    }
                    return returnValue;
                }
                static removeAllMatched(array, k, compare) {
                    let returnValue = [];
                    if (compare) {
                        for (let i = 0; i < array.length; i++) {
                            if (compare(array[i], k)) {
                                returnValue.push(array.splice(i, 1)[0]);
                                i--;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < array.length; i++) {
                            if (array[i] == k) {
                                returnValue.push(array.splice(i, 1)[0]);
                                i--;
                            }
                        }
                    }
                    return returnValue;
                }
            }
            StaticTools.Array = Array;
        })(StaticTools = type.StaticTools || (type.StaticTools = {}));
    })(type = sys.type || (sys.type = {}));
})(sys || (sys = {}));
//# sourceMappingURL=index.js.map