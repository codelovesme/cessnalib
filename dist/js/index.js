"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.js = void 0;
var sift = require("sift");
var js;
(function (js) {
    var Class = /** @class */ (function () {
        function Class() {
        }
        Class.toDotNotation = function (obj) {
            var obj_ = obj;
            //check if obj is object or not
            if (!obj && typeof obj !== "object")
                return obj;
            //if the obj terminal then return itself
            var ret_ = {};
            for (var key in obj) {
                if (!Class.isPrimitiveType(obj_[key])) {
                    var r = Class.toDotNotation(obj_[key]);
                    for (var k in r) {
                        ret_[key + "." + k] = r[k];
                    }
                }
                else {
                    ret_[key] = obj_[key];
                }
            }
            return ret_;
        };
        Class.clean = function (obj) {
            delete obj.__proto__;
        };
        Class.extend = function (subInstance, parentInstance) {
            for (var prop in parentInstance) {
                if (!subInstance[prop])
                    subInstance[prop] = parentInstance[prop];
            }
            return subInstance;
        };
        Class.clone = function (obj, deep) {
            if (this.isPrimitiveType(obj))
                return obj;
            if (obj instanceof Array) {
                var sub_1 = [];
                for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                    var item = obj_1[_i];
                    sub_1.push(Class.clone(item, true));
                }
                return sub_1;
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
        };
        Class.merge = function (primaryInstance, secondaryInstance) {
            for (var prop in secondaryInstance) {
                if (!primaryInstance[prop])
                    primaryInstance[prop] = secondaryInstance[prop];
            }
            return primaryInstance;
        };
        Class.patch = function (source, patch) {
            var obj = Class.clone(source, true);
            for (var key in patch) {
                if (Class.isPrimitiveType(obj[key])) {
                    obj[key] = patch[key];
                }
                else {
                    obj[key] = Class.patch(obj[key], patch[key]);
                }
            }
            return obj;
        };
        Class.classify = function (emptyInstance, valueObj) {
            for (var prop in emptyInstance) {
                if ("function" !== typeof emptyInstance[prop] && !emptyInstance[prop])
                    emptyInstance[prop] = valueObj[prop];
            }
            return emptyInstance;
        };
        Class.valuefy = function (instance) {
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
        };
        Class.isPrimitiveType = function (obj) {
            return (typeof obj === "string" ||
                typeof obj === "number" ||
                typeof obj === "boolean" ||
                obj === undefined ||
                obj === null ||
                typeof obj === "symbol");
        };
        Class.instanceOf = function (referenceObject, obj) {
            if (obj === null || obj === undefined)
                return false;
            if (Class.isPrimitiveType(referenceObject))
                return typeof referenceObject === typeof obj;
            for (var prop in referenceObject) {
                if (obj[prop] === undefined)
                    return false;
            }
            return true;
        };
        ///TODO must be upgraded
        Class.doesCover = function (obj1, obj2) {
            for (var key in obj2) {
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
        };
        Class.doesMongoCover = function (obj, query) {
            var array = sift.default(query, [obj]);
            return array instanceof Array && array.length > 0;
        };
        return Class;
    }());
    js.Class = Class;
})(js = exports.js || (exports.js = {}));
//# sourceMappingURL=index.js.map