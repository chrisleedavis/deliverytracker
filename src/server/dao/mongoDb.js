"use strict";

let config = require("../config/config"),
    logger = require("../logger"),
    _ = require("lodash"),
    ObjectId = require("mongodb").ObjectId,
    BaseDb = require("./baseDb"),
    MongoClient = require("mongodb").MongoClient,
    database,
    formatId = Symbol(),
    logError = Symbol();

class MongoDb extends BaseDb {

    constructor() {
        super();
        MongoClient.connect(config.databaseUrl).then((db) => {
            database = db;
        });

        //private members
        this[formatId] = (searchObj) => {
            //mongodb generated keys are stored as ObjectIds
            let keys = _.keys(searchObj);
            if (keys.length === 1 && keys[0] === "_id") {
                searchObj._id = new ObjectId(searchObj._id);
            }

            return searchObj;
        };

        this[logError] = (err, callback) => {
            logger.instance().error(new Date().toJSON(), err.stack);

            if (callback) {
                callback({ error: "An error occurred.  Please contact the system administrator." });
            }
        };
    }

    create(collection, newObj, callback) {

        super.validateObject(newObj);

        let dbCollection = database.collection(collection);

        dbCollection.insertOne(newObj)
            .then((result) => {
                callback(result.ops[0]);
            })
            .catch((err) => {
                this[logError](err, callback);
            });
    }

    read(collection, searchObj, callback) {

        super.validateObject(searchObj);

        this[formatId](searchObj);

        let dbCollection = database.collection(collection);

        dbCollection.find(searchObj).toArray()
            .then((result) => {
                callback(result);
            })
            .catch((err) => {
                this[logError](err, callback);
            });
    }

    update(collection, searchObj, updatedObj, callback) {

        super.validateObject(searchObj, updatedObj);

        this[formatId](searchObj);

        let dbCollection = database.collection(collection);

        dbCollection.updateOne(searchObj, updatedObj)
            .then((result) => {
                callback(result.ops[0]);
            })
            .catch((err) => {
                this[logError](err, callback);
            });
    }

    delete(collection, searchObj) {

        super.validateObject(searchObj);

        this[formatId](searchObj);

        let dbCollection = database.collection(collection);

        dbCollection.delete(searchObj)
            .catch((err) => {
                this[logError](err);
            });
    }

}

module.exports = MongoDb;
