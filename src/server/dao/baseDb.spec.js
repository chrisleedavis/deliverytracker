"use strict";

describe("BaseDb Tests", () => {

    let BaseDb = require("./baseDb");

    it("should throw error if attempting to instantiate BaseDb directly", () => {

        try {
            new BaseDb();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: BaseDb is an abstract class and cannot be instantiated directly");
        }
    });

    it("should throw error if derived BaseDb doesn't implement 'create' method", () => {

        let MockDb = class extends BaseDb { constructor() {super();} };

        try {
            new MockDb();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: must implement abstract method BaseDb.create");
        }
    });

    it("should throw error if derived BaseDb doesn't implement 'read' method", () => {

        let MockDb = class extends BaseDb {
                constructor() { super(); }
                create() { }
            };

        try {
            new MockDb();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: must implement abstract method BaseDb.read");
        }
    });

    it("should throw error if derived BaseDb doesn't implement 'update' method", () => {

        let MockDb = class extends BaseDb {
            constructor() { super(); }
            create() { }
            read() { }
        };

        try {
            new MockDb();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: must implement abstract method BaseDb.update");
        }
    });

    it("should throw error if derived BaseDb doesn't implement 'delete' method", () => {

        let MockDb = class extends BaseDb {
            constructor() { super(); }
            create() { }
            read() { }
            update() { }
        };

        try {
            new MockDb();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: must implement abstract method BaseDb.delete");
        }
    });

    it("should instantiate BaseDb appropriately", () => {

        let MockDb = class extends BaseDb {
                constructor() { super(); }
                create() { }
                read() { }
                update() { }
                delete() { }
            },
            db = new MockDb();

        expect(db instanceof BaseDb).toBeTruthy();

    });

    it("should validate objects properly", () => {

        let obj1 = {},
            obj2 = {},
            obj3 = {},
            MockDb = class extends BaseDb {
                constructor() { super(); }
                create() { super.validateObject(obj1, obj2, obj3); return true; }
                read() { }
                update() { }
                delete() { }
            },
            db = new MockDb();

        expect(db.create()).toBeTruthy();

        obj2 = null;

        try {
            db.create();
        } catch (e) {
            expect(e.toString()).toEqual("TypeError: Object must be defined");
        }

    });

});

