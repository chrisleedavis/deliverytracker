"use strict";

let _ = require("lodash"),
    validateCollection = Symbol(),
    validateObj = Symbol();

class BaseDb {
    constructor() {
        if (this.constructor === BaseDb) {
            throw new TypeError("BaseDb is an abstract class and cannot be instantiated directly");
        }

        if (this.create === undefined) {
            throw new TypeError("must implement abstract method BaseDb.create");
        }

        if (this.read === undefined) {
            throw new TypeError("must implement abstract method BaseDb.read");
        }

        if (this.update === undefined) {
            throw new TypeError("must implement abstract method BaseDb.update");
        }

        if (this.delete === undefined) {
            throw new TypeError("must implement abstract method BaseDb.delete");
        }

        //private members
        this[validateCollection] = (collection) => {
            if (!this[collection]) {
                throw new TypeError("Collection not found in database: " + collection);
            }
        };

        this[validateObj] = (obj) => {
            if (_.isUndefined(obj) || _.isNull(obj)) {
                throw new TypeError("Object must be defined");
            }
        };
    }

    validateCollection(collection) {
        this[validateCollection](collection);
    }

    validateObject() {

        let self = this;

        _.each(arguments, (obj) => {
            self[validateObj](obj);
        });
    }

    validateCollectionAndObject(collection, obj) {
        this[validateCollection](collection);
        this[validateObj](obj);
    }
}

module.exports = BaseDb;
