"use strict";

const bcrypt = require("bcrypt-nodejs");

module.exports = {

    encryptText: (text) => {

        return new Promise((resolve, reject) => {

            bcrypt.genSalt(5, (err, salt) => {
                if (err) {
                    reject(err);
                }

                bcrypt.hash(text, salt, null, (err, hash) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(hash);
                });
            });

        });
    },

    compareHash: (hash1, hash2) => {

        return new Promise((resolve, reject) => {

            bcrypt.compare(hash1, hash2, (err, isMatch) => {
                if (err) {
                    reject(err);
                }

                resolve(isMatch);
            });

        });
    }

};
