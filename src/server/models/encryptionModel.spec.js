"use strict";

describe("Encryption Model Tests", () => {

    const mockery = require("mockery"),
        clearModuleCache = require("../_clearModuleCache");

    let roundsOverride;

    beforeEach(() => {

        roundsOverride = undefined;

        //make sure module can be loaded for each test
        clearModuleCache();

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock("bcrypt-nodejs", {
            genSalt: (rounds, callback) => {
                let err,
                    salt = "saltFooBar";

                if (roundsOverride) {
                    err = "punkedSalt";
                }

                callback(err, salt);
            },
            hash: (text, salt, progress, callback) => {
                let err,
                    hash = "hashFooBar";

                if (!text) {
                    err = "punkedHash";
                }

                callback(err, hash);
            },
            compare: (value1, value2, callback) => {
                let err,
                    isMatch = value1 === value2;

                if (!value1) {
                    err = "punkedCompare";
                }

                callback(err, isMatch);
            }
        });
    });

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it("should encrypt text properly", (done) => {

        const encryption = require("./encryptionModel"),
            clear = "hello world";

        encryption.encryptText(clear).then((encrypted) => {
            expect(clear).not.toEqual(encrypted);
            expect(encrypted).toEqual("hashFooBar");
            done();
        });
    });

    it("should catch error if encryption fails during salt generation", (done) => {

        const encryption = require("./encryptionModel");
        roundsOverride = 213;

        encryption.encryptText("blah").catch((err) => {
            expect(err).toEqual("punkedSalt");
            done();
        });
    });

    it("should catch error if encryption fails during hash generation", (done) => {

        const encryption = require("./encryptionModel");

        encryption.encryptText(undefined).catch((err) => {
            expect(err).toEqual("punkedHash");
            done();
        });
    });

    it("should compare hashes properly", (done) => {

        const encryption = require("./encryptionModel"),
            hash1 = "fooBar";

        let hash2 = "fooBar";

        encryption.compareHash(hash1, hash2).then((isMatch) => {
            expect(isMatch).toBeTruthy();
            done();
        });

        hash2 = "blah";

        encryption.compareHash(hash1, hash2).then((isMatch) => {
            expect(isMatch).not.toBeTruthy();
            done();
        });
    });

    it("should catch error if hash compare fails", (done) => {

        const encryption = require("./encryptionModel");

        encryption.compareHash(undefined).catch((err) => {
            expect(err).toEqual("punkedCompare");
            done();
        });
    });
});

