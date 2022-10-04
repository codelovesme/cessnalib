import * as sift from "sift";

export namespace js {
    export class Class {
      public static toDotNotation(obj: object) {
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
      public static clean(obj: object): void {
        delete (obj as any).__proto__;
      }
      public static extend(subInstance: any, parentInstance: any): any {
        for (let prop in parentInstance) {
          if (!subInstance[prop]) subInstance[prop] = parentInstance[prop];
        }
        return subInstance;
      }
      public static clone<T extends any>(obj: T, deep: boolean): T {
        if (this.isPrimitiveType(obj)) return obj;
        if (obj instanceof Array) {
          let sub = [];
          for (let item of obj) {
            sub.push(Class.clone(item, true));
          }
          return sub as any;
        } else {
          var sub: any = {};
          for (var prop in obj) {
            sub[prop] =
              deep && "object" === typeof obj[prop]
                ? Class.clone(obj[prop], true)
                : obj[prop];
          }
          return <T>sub;
        }
      }
      public static merge(primaryInstance: any, secondaryInstance: any) {
        for (var prop in secondaryInstance) {
          if (!primaryInstance[prop])
            primaryInstance[prop] = secondaryInstance[prop];
        }
        return primaryInstance;
      }
      public static patch(source: any, patch: any) {
        let obj = Class.clone(source, true);
        for (let key in patch) {
          if (Class.isPrimitiveType(obj[key])) {
            obj[key] = patch[key];
          } else {
            obj[key] = Class.patch(obj[key], patch[key]);
          }
        }
        return obj;
      }
      public static classify(emptyInstance: any, valueObj: any) {
        for (var prop in emptyInstance) {
          if ("function" !== typeof emptyInstance[prop] && !emptyInstance[prop])
            emptyInstance[prop] = valueObj[prop];
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
          } else if (
            prop.substring(0, 3) === "get" &&
            (propToValuefy = prop.substring(3, prop.length))
          ) {
            valueObj[
              propToValuefy[0].toLowerCase() +
                propToValuefy.substring(1, propToValuefy.length)
            ] = instance[prop]();
          }
        }
        return valueObj;
      }
      public static isPrimitiveType(obj: any): boolean {
        return (
          typeof obj === "string" ||
          typeof obj === "number" ||
          typeof obj === "boolean" ||
          obj === undefined ||
          obj === null ||
          typeof obj === "symbol"
        );
      }
      public static instanceOf<T>(referenceObject: T, obj: any | T): obj is T {
        if (obj === null || obj === undefined) return false;
        if (Class.isPrimitiveType(referenceObject))
          return typeof referenceObject === typeof obj;
        for (var prop in referenceObject) {
          if (obj[prop] === undefined) return false;
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
        let array = sift.default(query, [obj]);
        return array instanceof Array && array.length > 0;
      }
    }
  }