"use strict";
/**
 * Created by codelovesme on 6/19/2015.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var chai = require("chai");
var Class = index_1.js.Class;
var StaticTools = index_1.sys.type.StaticTools;
describe("euglena", function () {
    describe("js", function () {
        describe("Class", function () {
            describe("equals", function () {
                it("should return true if both of object empty", function () {
                    //given
                    var obj1 = {};
                    var obj2 = {};
                    //when
                    var result = StaticTools.Object.equals(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal in shadow", function () {
                    //given
                    var obj1 = { name: "fedai", surname: "kaya" };
                    var obj2 = { name: "fedai", surname: "kaya" };
                    //when
                    var result = StaticTools.Object.equals(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal in deep", function () {
                    //given
                    var obj1 = { name: "fedai", surname: "kaya" };
                    var obj2 = { name: "fedai", surname: "kaya" };
                    //when
                    var result = StaticTools.Object.equals(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal in deep 2", function () {
                    //given
                    var obj1 = { name: "fedai", surname: "kaya", pet: { name: "Doggy" } };
                    var obj2 = { name: "fedai", surname: "kaya", pet: { name: "Doggy" } };
                    //when
                    var result = StaticTools.Object.equals(obj1, obj2, true);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal", function () {
                    //given
                    var obj = {};
                    var obj1 = { name: "fedai", surname: "kaya", obj: obj };
                    var obj2 = { name: "fedai", surname: "kaya", obj: obj };
                    //when
                    var result = StaticTools.Object.equals(obj1, obj2);
                    var result2 = StaticTools.Object.equals(obj1, obj2, true);
                    //then
                    chai.expect(result).to.be.true;
                    chai.expect(result2).to.be.true;
                });
                it("should return false if they are different of has deifferent values", function () {
                    //given
                    var obj = {};
                    var obj1 = { name: "fedai", surname: "kaya" };
                    var obj2 = { name: "ahmet", surname: "efendi" };
                    var obj3 = { J: "j" };
                    //when
                    var result = StaticTools.Object.equals(obj1, obj2);
                    var result2 = StaticTools.Object.equals(obj1, obj3, true);
                    var result3 = StaticTools.Object.equals(obj1, obj, true);
                    //then
                    chai.expect(result).to.be.false;
                    chai.expect(result2).to.be.false;
                    chai.expect(result3).to.be.false;
                });
            });
            describe("doesCover", function () {
                it("should return false if obj1 is empty obj2 has some keys", function () {
                    //given
                    var obj1 = {};
                    var obj2 = { name: "fedai" };
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj1 is and obj2 same object", function () {
                    //given
                    var obj1 = { name: "fedai" };
                    var obj2 = { name: "fedai" };
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 is and obj2 same object and has inner object", function () {
                    //given
                    var obj1 = { name: { surname: "kaya" } };
                    var obj2 = { name: { surname: "kaya" } };
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 is and obj2 different object and has inner object", function () {
                    //given
                    var obj1 = { name: { surname: "fedai" } };
                    var obj2 = { name: { surname: "kaya" } };
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj2 is empty", function () {
                    //given
                    var obj1 = { name: { surname: "fedai" } };
                    var obj2 = {};
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return false if obj2 has dıfferent keys", function () {
                    //given
                    var obj1 = { name: { surname: "fedai" } };
                    var obj2 = { surname: "fedai" };
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if both of them is empty objects", function () {
                    //given
                    var obj1 = {};
                    var obj2 = {};
                    //when
                    var result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
            });
            describe("extend", function () {
                it("should return empty object if subInstance and parentInstance are both empty objects", function () {
                    //given
                    var subInstance = {};
                    var parentInstance = {};
                    //when
                    var extendedObject = index_1.js.Class.extend(subInstance, parentInstance);
                    //then
                    chai.expect(extendedObject).to.be.empty;
                });
                it("should return an object contains prop name for empty object as subInstance and an object has a property named 'name' as parentInstance", function () {
                    //given
                    var subInstance = {};
                    var parentInstance = { name: "fedai" };
                    //when
                    var extendedObject = index_1.js.Class.extend(subInstance, parentInstance);
                    var propCount = Object.keys(extendedObject).length;
                    //then
                    chai.expect(extendedObject).not.to.be.eqls(null);
                    chai.expect(extendedObject).not.to.be.eqls({});
                    chai.expect(extendedObject).not.to.be.eqls({ name: "" });
                    chai.expect(extendedObject).to.be.eqls({ name: "fedai" });
                    chai.expect(propCount).to.be.equals(1);
                });
                it("should return an object contains prop name and surname for an object has prop surname as subInstance and an object has a property named 'name' as parentInstance", function () {
                    //given
                    var subInstance = { surname: "kaya" };
                    var parentInstance = { name: "fedai" };
                    //when
                    var extendedObject = index_1.js.Class.extend(subInstance, parentInstance);
                    var propCount = Object.keys(extendedObject).length;
                    //then
                    chai.expect(extendedObject).to.be.eqls({ name: "fedai", surname: "kaya" });
                    chai.expect(propCount).to.be.equals(2);
                });
            });
            describe("doesMongoCover", function () {
                it("should return true if obj1 mongoCover obj2 - 1", function () {
                    //given
                    var obj1 = {
                        a: { $exists: true }
                    };
                    var obj2 = {
                        a: "done"
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return false if obj1 doesnt mongoCover obj2 - 1", function () {
                    //given
                    var obj1 = {
                        a: { $exists: false }
                    };
                    var obj2 = {
                        a: "done"
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj1 mongoCover obj2 - 2", function () {
                    //given
                    var obj1 = {
                        a: { $exists: true },
                        k: { $exists: false },
                        b: { $gte: 12 }
                    };
                    var obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d" }
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //
                    chai.expect(result).to.be.true;
                });
                it("should return false if obj1 mongoCover obj2 - 2", function () {
                    //given
                    var obj1 = {
                        a: { $exists: true },
                        b: { $gte: 12 },
                        c: { d: "de" }
                    };
                    var obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d" }
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj1 mongoCover obj2 - 3", function () {
                    //given
                    var obj1 = {
                        a: { $exists: true },
                        b: { $gte: 12 },
                        c: { d: "d" }
                    };
                    var obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d" }
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 mongoCover obj2 - 4", function () {
                    //given
                    var obj1 = {
                        c: { d: "d" }
                    };
                    var obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d", e: "e" }
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 mongoCover obj2 - 5", function () {
                    //given
                    var obj1 = {
                        "c.d": "d"
                    };
                    var obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d", e: "e" }
                    };
                    //when
                    var result = index_1.js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
            });
        });
    });
});
//# sourceMappingURL=index.js.map