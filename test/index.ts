/**
 * Created by codelovesme on 6/19/2015.
 */

import { sys, js } from "../src/index";
import * as chai from "chai";

import Class = js.Class;
import StaticTools = sys.type.StaticTools;

describe("euglena", () => {
    describe("js", () => {
        describe("Class", () => {
            describe("equals", () => {
                it("should return true if both of object empty", () => {
                    //given
                    let obj1 = {};
                    let obj2 = {};
                    //when
                    let result = StaticTools.Object.equals(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal in shadow", () => {
                    //given
                    let obj1 = { name: "fedai", surname: "kaya" };
                    let obj2 = { name: "fedai", surname: "kaya" };
                    //when
                    let result = StaticTools.Object.equals(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal in deep", () => {
                    //given
                    let obj1 = { name: "fedai", surname: "kaya" };
                    let obj2 = { name: "fedai", surname: "kaya" };
                    //when
                    let result = StaticTools.Object.equals(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal in deep 2", () => {
                    //given
                    let obj1 = { name: "fedai", surname: "kaya", pet: { name: "Doggy" } };
                    let obj2 = { name: "fedai", surname: "kaya", pet: { name: "Doggy" } };
                    //when
                    let result = StaticTools.Object.equals(obj1, obj2, true);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if both of object is equal", () => {
                    //given
                    let obj = {};
                    let obj1 = { name: "fedai", surname: "kaya", obj: obj };
                    let obj2 = { name: "fedai", surname: "kaya", obj: obj };
                    //when
                    let result = StaticTools.Object.equals(obj1, obj2);
                    let result2 = StaticTools.Object.equals(obj1, obj2, true);
                    //then
                    chai.expect(result).to.be.true;
                    chai.expect(result2).to.be.true;
                });
                it("should return false if they are different of has deifferent values", () => {
                    //given
                    let obj = {};
                    let obj1 = { name: "fedai", surname: "kaya" };
                    let obj2 = { name: "ahmet", surname: "efendi" };
                    let obj3 = { J: "j" };
                    //when
                    let result = StaticTools.Object.equals(obj1, obj2);
                    let result2 = StaticTools.Object.equals(obj1, obj3, true);
                    let result3 = StaticTools.Object.equals(obj1, obj, true);
                    //then
                    chai.expect(result).to.be.false;
                    chai.expect(result2).to.be.false;
                    chai.expect(result3).to.be.false;
                });
            });
            describe("doesCover", () => {
                it("should return false if obj1 is empty obj2 has some keys", () => {
                    //given
                    let obj1 = {};
                    let obj2 = { name: "fedai" };
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj1 is and obj2 same object", () => {
                    //given
                    let obj1 = { name: "fedai" };
                    let obj2 = { name: "fedai" };
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 is and obj2 same object and has inner object", () => {
                    //given
                    let obj1 = { name: { surname: "kaya" } };
                    let obj2 = { name: { surname: "kaya" } };
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 is and obj2 different object and has inner object", () => {
                    //given
                    let obj1 = { name: { surname: "fedai" } };
                    let obj2 = { name: { surname: "kaya" } };
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj2 is empty", () => {
                    //given
                    let obj1 = { name: { surname: "fedai" } };
                    let obj2 = {};
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return false if obj2 has dıfferent keys", () => {
                    //given
                    let obj1 = { name: { surname: "fedai" } };
                    let obj2 = { surname: "fedai" };
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if both of them is empty objects", () => {
                    //given
                    let obj1 = {};
                    let obj2 = {};
                    //when
                    let result = Class.doesCover(obj1, obj2);
                    //then
                    chai.expect(result).to.be.true;
                });
            });
            describe("extend", () => {
                it("should return empty object if subInstance and parentInstance are both empty objects", () => {
                    //given
                    var subInstance = {};
                    var parentInstance = {};
                    //when
                    var extendedObject = js.Class.extend(subInstance, parentInstance);
                    //then
                    chai.expect(extendedObject).to.be.empty;
                });

                it("should return an object contains prop name for empty object as subInstance and an object has a property named 'name' as parentInstance", () => {
                    //given
                    var subInstance = {};
                    var parentInstance = { name: "fedai" };
                    //when
                    var extendedObject = js.Class.extend(subInstance, parentInstance);
                    var propCount = Object.keys(extendedObject).length;
                    //then
                    chai.expect(extendedObject).not.to.be.eqls(null);
                    chai.expect(extendedObject).not.to.be.eqls({});
                    chai.expect(extendedObject).not.to.be.eqls({ name: "" });
                    chai.expect(extendedObject).to.be.eqls({ name: "fedai" });
                    chai.expect(propCount).to.be.equals(1);
                });

                it("should return an object contains prop name and surname for an object has prop surname as subInstance and an object has a property named 'name' as parentInstance", () => {
                    //given
                    var subInstance = { surname: "kaya" };
                    var parentInstance = { name: "fedai" };
                    //when
                    var extendedObject = js.Class.extend(subInstance, parentInstance);
                    var propCount = Object.keys(extendedObject).length;
                    //then
                    chai.expect(extendedObject).to.be.eqls({ name: "fedai", surname: "kaya" });
                    chai.expect(propCount).to.be.equals(2);
                });
            });
            describe("doesMongoCover", () => {
                it("should return true if obj1 mongoCover obj2 - 1", () => {
                    //given
                    let obj1 = {
                        a: { $exists: true }
                    };
                    let obj2 = {
                        a: "done"
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return false if obj1 doesnt mongoCover obj2 - 1", () => {
                    //given
                    let obj1 = {
                        a: { $exists: false }
                    };
                    let obj2 = {
                        a: "done"
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj1 mongoCover obj2 - 2", () => {
                    //given
                    let obj1 = {
                        a: { $exists: true },
                        k: { $exists: false },
                        b: { $gte: 12 }
                    };
                    let obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d" }
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //
                    chai.expect(result).to.be.true;
                });
                it("should return false if obj1 mongoCover obj2 - 2", () => {
                    //given
                    let obj1 = {
                        a: { $exists: true },
                        b: { $gte: 12 },
                        c: { d: "de" }
                    };
                    let obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d" }
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.false;
                });
                it("should return true if obj1 mongoCover obj2 - 3", () => {
                    //given
                    let obj1 = {
                        a: { $exists: true },
                        b: { $gte: 12 },
                        c: { d: "d" }
                    };
                    let obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d" }
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 mongoCover obj2 - 4", () => {
                    //given
                    let obj1 = {
                        c: { d: "d" }
                    };
                    let obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d", e: "e" }
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
                it("should return true if obj1 mongoCover obj2 - 5", () => {
                    //given
                    let obj1 = {
                        "c.d": "d"
                    };
                    let obj2 = {
                        a: "done",
                        b: 34,
                        c: { d: "d", e: "e" }
                    };
                    //when
                    let result = js.Class.doesMongoCover(obj2, obj1);
                    //then
                    chai.expect(result).to.be.true;
                });
            });
        });
    });
});