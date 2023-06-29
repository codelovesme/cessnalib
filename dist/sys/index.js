"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sys = void 0;
var index_1 = require("../index");
var JavascriptDate = Date;
var sys;
(function (sys) {
    var Observable = /** @class */ (function () {
        function Observable(run) {
            var _this = this;
            this.listeners = [];
            run(function (data) {
                for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener(data);
                }
            });
        }
        Observable.prototype.subscribe = function (callback) {
            this.listeners.push(callback);
        };
        return Observable;
    }());
    sys.Observable = Observable;
    var Exception = /** @class */ (function () {
        function Exception(message, innerException) {
            this.message = message;
            this.innerException = innerException;
        }
        return Exception;
    }());
    sys.Exception = Exception;
    var Map = /** @class */ (function () {
        function Map(compareKeys) {
            this.compareKeys = compareKeys;
            this.keys = new Array();
            this.values = new Array();
        }
        Map.prototype.add = function (key, value) {
            if (!this.get(key)) {
                this.keys.push(key);
                this.values.push(value);
            }
            else {
                throw "KeyAlreadyExistException";
            }
        };
        Map.prototype.keyExists = function (key) {
            return this.indexOf(key) >= 0;
        };
        Map.prototype.set = function (key, value) {
            var index = this.indexOf(key);
            if (index >= 0) {
                this.values[index] = value;
            }
            else {
                this.keys.push(key);
                this.values.push(value);
            }
        };
        Map.prototype.remove = function (key) {
            var index = this.indexOf(key);
            if (index >= 0) {
                this.keys.slice(index, 1);
                this.values.slice(index, 1);
            }
        };
        Map.prototype.indexOf = function (key) {
            var _this = this;
            var index = -1;
            if (this.compareKeys) {
                this.keys.forEach(function (k) {
                    if (_this.compareKeys(k, key)) {
                        index = _this.keys.indexOf(k);
                    }
                });
            }
            else {
                index = this.keys.indexOf(key);
            }
            return index;
        };
        Map.prototype.get = function (key) {
            return this.values[this.indexOf(key)];
        };
        Map.prototype.getKeys = function () {
            return this.keys;
        };
        Map.prototype.getValues = function () {
            return this.values;
        };
        return Map;
    }());
    sys.Map = Map;
    var Point2D = /** @class */ (function () {
        function Point2D(x, y) {
            this.x = x;
            this.y = y;
            this.className = "cessnalib.type.Point2D";
        }
        return Point2D;
    }());
    sys.Point2D = Point2D;
    var TimeSpan = /** @class */ (function () {
        function TimeSpan(days, hours, minutes, seconds, miliseconds) {
            this.days = days;
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
            this.miliseconds = miliseconds;
            this.className = "cessnalib.type.TimeSpan";
        }
        return TimeSpan;
    }());
    sys.TimeSpan = TimeSpan;
    var Time = /** @class */ (function () {
        function Time(date, clock) {
            this.date = date;
            this.clock = clock;
            this.className = "cessnalib.type.Time";
        }
        return Time;
    }());
    sys.Time = Time;
    var Date = /** @class */ (function () {
        function Date(year, month, day) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.className = "cessnalib.type.Date";
        }
        return Date;
    }());
    sys.Date = Date;
    var Clock = /** @class */ (function () {
        function Clock(hour, minute, second) {
            this.hour = hour;
            this.minute = minute;
            this.second = second;
            this.className = "cessnalib.type.Clock";
        }
        return Clock;
    }());
    sys.Clock = Clock;
    var reference;
    (function (reference) {
        reference.Exception = new sys.Exception("Exception", null);
    })(reference = sys.reference || (sys.reference = {}));
    var StaticTools;
    (function (StaticTools) {
        var Email = /** @class */ (function () {
            function Email() {
            }
            Email.validateEmail = function (email) {
                // Regular expression pattern for email validation
                var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                // Check if the email matches the pattern
                return pattern.test(email);
            };
            return Email;
        }());
        StaticTools.Email = Email;
        var Point2D = /** @class */ (function () {
            function Point2D() {
            }
            Point2D.distance = function (point1, point2) {
                return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
            };
            return Point2D;
        }());
        StaticTools.Point2D = Point2D;
        var Any = /** @class */ (function () {
            function Any() {
            }
            Any.equals = function (val1, val2, deep) {
                return ((index_1.js.Class.isPrimitiveType(val1) &&
                    index_1.js.Class.isPrimitiveType(val2) &&
                    Primitive.equals(val1, val2)) ||
                    (!index_1.js.Class.isPrimitiveType(val1) &&
                        !index_1.js.Class.isPrimitiveType(val2) &&
                        Obj.equals(val1, val2, deep)));
            };
            return Any;
        }());
        StaticTools.Any = Any;
        var Primitive = /** @class */ (function () {
            function Primitive() {
            }
            Primitive.equals = function (val1, val2) {
                return val1 === val2;
            };
            return Primitive;
        }());
        StaticTools.Primitive = Primitive;
        var Obj = /** @class */ (function () {
            function Obj() {
            }
            Obj.equals = function (obj1, obj2, deep) {
                if (!obj1 && !obj2) {
                    return true;
                }
                if (!obj1 || !obj2) {
                    return false;
                }
                var obj1keys = Object.keys(obj1);
                var obj2keys = Object.keys(obj2);
                if (!Array.equals(obj1keys, obj2keys))
                    return false;
                if (obj1keys.length == 0)
                    return true;
                if (deep) {
                    for (var _i = 0, obj1keys_1 = obj1keys; _i < obj1keys_1.length; _i++) {
                        var key = obj1keys_1[_i];
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
                    for (var _a = 0, obj1keys_2 = obj1keys; _a < obj1keys_2.length; _a++) {
                        var key = obj1keys_2[_a];
                        if (obj1[key] != obj2[key])
                            return false;
                    }
                }
                return true;
            };
            return Obj;
        }());
        StaticTools.Obj = Obj;
        var Exception = /** @class */ (function () {
            function Exception() {
            }
            Exception.isNotException = function (t) {
                return !index_1.js.Class.instanceOf(reference.Exception, t);
            };
            return Exception;
        }());
        StaticTools.Exception = Exception;
        var UUID = /** @class */ (function () {
            function UUID() {
            }
            UUID.generate = function () {
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
            };
            return UUID;
        }());
        StaticTools.UUID = UUID;
        var TimeSpan = /** @class */ (function () {
            function TimeSpan() {
            }
            TimeSpan.fromUnixTimestamp = function (timestamp) {
                var days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
                timestamp -= days * (1000 * 60 * 60 * 24);
                var hours = Math.floor(timestamp / (1000 * 60 * 60));
                timestamp -= hours * (1000 * 60 * 60);
                var minutes = Math.floor(timestamp / (1000 * 60));
                timestamp -= minutes * (1000 * 60);
                var seconds = Math.floor(timestamp / 1000);
                timestamp -= seconds * 1000;
                var miliseconds = timestamp;
                return new sys.TimeSpan(days, hours, minutes, seconds, miliseconds);
            };
            TimeSpan.toUnixTimestamp = function (timespan) {
                var fromdays = timespan.days * 60 * 60 * 24 * 1000;
                var fromhours = timespan.hours * 60 * 60 * 1000;
                var fromminutes = timespan.minutes * 60 * 1000;
                var fromseconds = timespan.seconds * 1000;
                var frommiliseconds = timespan.miliseconds;
                return (fromdays + fromhours + fromminutes + fromseconds + frommiliseconds);
            };
            return TimeSpan;
        }());
        StaticTools.TimeSpan = TimeSpan;
        var Time = /** @class */ (function () {
            function Time() {
            }
            Time.biggerThan = function (time1, time2) {
                return Date.biggerThan(time1.date, time2.date)
                    ? true
                    : Date.biggerThan(time1.date, time2.date)
                        ? false
                        : Clock.biggerThan(time1.clock, time2.clock);
            };
            Time.equals = function (time1, time2) {
                return (Date.equals(time1.date, time2.date) &&
                    Clock.equals(time1.clock, time2.clock));
            };
            Time.now = function () {
                var newDate = new JavascriptDate();
                return new sys.Time(new sys.Date(newDate.getUTCFullYear(), newDate.getUTCMonth() + 1, newDate.getUTCDate()), new sys.Clock(newDate.getUTCHours(), newDate.getUTCMinutes(), newDate.getUTCSeconds()));
            };
            Time.addMiliseconds = function (time, miliseconds) {
                return Time.fromJavascriptDate(new JavascriptDate(Time.toJavascriptDate(time).getTime() + miliseconds));
            };
            Time.addMinutes = function (time, minutes) {
                var miliseconds = minutes * 60000;
                return Time.addMiliseconds(time, miliseconds);
            };
            Time.DayToMiliseconds = function (minute) {
                return minute * 86400000;
            };
            Time.HourToMiliseconds = function (minute) {
                return minute * 3600000;
            };
            Time.MinuteToMiliseconds = function (minute) {
                return minute * 60000;
            };
            Time.SecondToMiliseconds = function (minute) {
                return minute * 1000;
            };
            Time.fromJavascriptDate = function (date) {
                return new sys.Time(new sys.Date(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()), new sys.Clock(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
            };
            Time.toJavascriptDate = function (time) {
                var date = new JavascriptDate();
                date.setUTCFullYear(time.date.year);
                date.setUTCMonth(time.date.month - 1);
                date.setUTCDate(time.date.day);
                date.setUTCHours(time.clock.hour);
                date.setUTCMinutes(time.clock.minute);
                date.setUTCSeconds(time.clock.second);
                return date;
            };
            return Time;
        }());
        StaticTools.Time = Time;
        var Date = /** @class */ (function () {
            function Date() {
            }
            Date.equals = function (date1, date2) {
                return (date1.year == date2.year &&
                    date1.month == date2.month &&
                    date1.day == date2.day);
            };
            Date.biggerThan = function (date1, date2) {
                return date1.year > date2.year
                    ? true
                    : date1.year < date2.year
                        ? false
                        : date1.month > date2.month
                            ? true
                            : date1.month < date2.month
                                ? false
                                : date1.day > date2.day;
            };
            return Date;
        }());
        StaticTools.Date = Date;
        var Clock = /** @class */ (function () {
            function Clock() {
            }
            Clock.equals = function (clock1, clock2) {
                return (clock1.hour == clock2.hour &&
                    clock1.minute == clock2.minute &&
                    clock1.second == clock2.second);
            };
            Clock.biggerThan = function (clock1, clock2) {
                return clock1.hour > clock2.hour
                    ? true
                    : clock1.hour < clock2.hour
                        ? false
                        : clock1.minute > clock2.minute
                            ? true
                            : clock1.minute < clock2.minute
                                ? false
                                : clock1.second > clock2.second;
            };
            return Clock;
        }());
        StaticTools.Clock = Clock;
        var Array = /** @class */ (function () {
            function Array() {
            }
            Array.lastElement = function (array) {
                return array[array.length - 1];
            };
            Array.unifySameItems = function (array, compare) {
                if (compare === void 0) { compare = function (t1, t2) { return t1 === t2; }; }
                var ret = [];
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var item = array_1[_i];
                    if (!sys.StaticTools.Array.contains(ret, item, compare)) {
                        ret.push(item);
                    }
                }
                return ret;
            };
            Array.orderBy = function (array, compare) {
                for (var i = 0; i < array.length - 1; i++) {
                    for (var j = i + 1; j < array.length; j++) {
                        if (compare(array[i], array[j])) {
                            Array.swap(array, i, j);
                        }
                    }
                }
            };
            Array.swap = function (array, index1, index2) {
                var temp = array[index1];
                array[index1] = array[index2];
                array[index2] = temp;
            };
            Array.combine = function (array1, array2) {
                var a = array1.concat(array2);
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (a[i] === a[j])
                            a.splice(j--, 1);
                    }
                }
                return a;
            };
            Array.equals = function (array1, array2, compare) {
                if (!array1 && !array2)
                    return true;
                if (!array1 || !array2)
                    return false;
                if (array1.length !== array2.length)
                    return false;
                if (compare) {
                    for (var i = 0; i < array1.length; i++) {
                        if (!compare(array1[i], array2[i]))
                            return false;
                    }
                }
                else {
                    for (var i = 0; i < array1.length; i++) {
                        if (array1[i] !== array2[i])
                            return false;
                    }
                }
                return true;
            };
            Array.contains = function (array, k, compare) {
                return Array.indexOf(array, k, compare) >= 0;
            };
            Array.containsArray = function (master, slave, compare) {
                for (var _i = 0, slave_1 = slave; _i < slave_1.length; _i++) {
                    var s = slave_1[_i];
                    if (!Array.contains(master, s, compare))
                        return false;
                }
                return true;
            };
            Array.indexOf = function (array, k, compare) {
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
            };
            Array.removeAt = function (array, index) {
                return array.splice(index, 1)[0];
            };
            Array.remove = function (array, k, compare) {
                if (compare) {
                    for (var i = 0; i < array.length; i++) {
                        if (compare(array[i], k)) {
                            return array.splice(i, 1)[0];
                        }
                    }
                }
                else {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == k) {
                            return array.splice(i, 1)[0];
                        }
                    }
                }
            };
            Array.getMatched = function (array, k, compare) {
                if (compare === void 0) { compare = function (arrayItem, t) { return arrayItem === t; }; }
                var ret;
                for (var i = 0; i < array.length; i++) {
                    if (compare(array[i], k)) {
                        ret = array[i];
                        break;
                    }
                }
                return ret;
            };
            Array.getAllMatched = function (array, k, compare) {
                var returnValue = [];
                if (compare) {
                    for (var i = 0; i < array.length; i++) {
                        if (compare(array[i], k)) {
                            returnValue.push(array[i]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == k) {
                            returnValue.push(array[i]);
                        }
                    }
                }
                return returnValue;
            };
            Array.removeAllMatched = function (array, k, compare) {
                var returnValue = [];
                if (compare) {
                    for (var i = 0; i < array.length; i++) {
                        if (compare(array[i], k)) {
                            returnValue.push(array.splice(i, 1)[0]);
                            i--;
                        }
                    }
                }
                else {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i] == k) {
                            returnValue.push(array.splice(i, 1)[0]);
                            i--;
                        }
                    }
                }
                return returnValue;
            };
            return Array;
        }());
        StaticTools.Array = Array;
    })(StaticTools = sys.StaticTools || (sys.StaticTools = {}));
})(sys = exports.sys || (exports.sys = {}));
//# sourceMappingURL=index.js.map