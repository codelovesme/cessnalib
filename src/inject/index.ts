export namespace inject {
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
  
  