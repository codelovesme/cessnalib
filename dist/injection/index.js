"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injection = void 0;
var injection;
(function (injection) {
    var StaticTools = /** @class */ (function () {
        function StaticTools() {
        }
        StaticTools.valueOfValueChooser = function (valueChooser) {
            return valueChooser.values[valueChooser.index];
        };
        return StaticTools;
    }());
    injection.StaticTools = StaticTools;
    var Configuration = /** @class */ (function () {
        function Configuration() {
        }
        return Configuration;
    }());
    injection.Configuration = Configuration;
    var ValueChooser = /** @class */ (function () {
        function ValueChooser() {
            this.index = 0;
        }
        return ValueChooser;
    }());
    injection.ValueChooser = ValueChooser;
    var ObjectChooser = /** @class */ (function () {
        function ObjectChooser() {
        }
        return ObjectChooser;
    }());
    injection.ObjectChooser = ObjectChooser;
})(injection = exports.injection || (exports.injection = {}));
//# sourceMappingURL=index.js.map