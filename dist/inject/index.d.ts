export declare namespace inject {
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
