"use strict";

const bcrypt = require("bcrypt-nodejs"),
    config = require("../config/config"),
    jwt = require("jsonwebtoken"),
    crypto = require("crypto"),
    algorithm = "aes-256-ctr";

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

    encryptToken: (user) => {

        //encrypt auth token to hide payload from dev tool users
        const token = jwt.sign(user, config.secret, { expiresIn: 86400 }),
              cipher = crypto.createCipher(algorithm, config.secret);
        let encryptedToken = cipher.update(token, "utf8", "hex");

        encryptedToken += cipher.final("hex");

        return encryptedToken;

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
