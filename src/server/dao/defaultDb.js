"use strict";

/*
    simple database with a lifespan of the current node/server session
    - meant for testing purposes
 */
let BaseDb = require("./baseDb"),
    _ = require("lodash");

class DefaultDb extends BaseDb {

    constructor() {
        super();
        this.employees = [];
        this.notifications = [];
    }

    create(collection, newObj, callback) {

        super.validateCollectionAndObject(collection, newObj);

        newObj.id = this[collection].length + 1;

        this[collection].push(newObj);
        callback(newObj);
    }

    read(collection, searchObj, callback) {

        super.validateCollection(collection);
        callback(_.where(this[collection], searchObj));
    }

    update(collection, searchObj, updatedObj, callback) {

        super.validateObject(searchObj);
        super.validateCollectionAndObject(collection, updatedObj);
        let foundIndex = _.findIndex(this[collection], searchObj);

        if (foundIndex >= 0) {
            this[collection][foundIndex] = updatedObj;
        }
        callback(updatedObj);
    }

    delete(collection, searchObj) {

        super.validateCollection(collection);
        this[collection] = _.reject(this[collection], searchObj);
    }
}

module.exports = DefaultDb;
