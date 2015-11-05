"use strict";

describe("User Model Tests", () => {

    it("should create schema properly", () => {

        const User = require("./userModel"),
            data = { username: "foobar@test.com", password: "itWorks" },
            user = new User(data);

        expect(user.username).toEqual(data.username);
        expect(user.password).toEqual(data.password);
    });

});
