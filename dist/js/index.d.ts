export declare namespace js {
    class Class {
        static toDotNotation(obj: object): any;
        static clean(obj: object): void;
        static extend(subInstance: any, parentInstance: any): any;
        static clone<T extends any>(obj: T, deep: boolean): T;
        static merge(primaryInstance: any, secondaryInstance: any): any;
        static patch(source: any, patch: any): any;
        static classify(emptyInstance: any, valueObj: any): any;
        static valuefy(instance: any): any;
        static isPrimitiveType(obj: any): boolean;
        static instanceOf<T>(referenceObject: T, obj: any | T): obj is T;
        static doesCover(obj1: any, obj2: any): boolean;
        static doesMongoCover(obj: any, query: any): boolean;
    }
}
