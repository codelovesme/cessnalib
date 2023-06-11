"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
var inject;
(function (inject) {
    var StaticTools = /** @class */ (function () {
        function StaticTools() {
        }
        StaticTools.valueOfValueChooser = function (valueChooser) {
            return valueChooser.values[valueChooser.index];
        };
        return StaticTools;
    }());
    inject.StaticTools = StaticTools;
    var Configuration = /** @class */ (function () {
        function Configuration() {
        }
        return Configuration;
    }());
    inject.Configuration = Configuration;
    var ValueChooser = /** @class */ (function () {
        function ValueChooser() {
            this.index = 0;
        }
        return ValueChooser;
    }());
    inject.ValueChooser = ValueChooser;
    var ObjectChooser = /** @class */ (function () {
        function ObjectChooser() {
        }
        return ObjectChooser;
    }());
    inject.ObjectChooser = ObjectChooser;
})(inject = exports.inject || (exports.inject = {}));
//# sourceMappingURL=index.js.map