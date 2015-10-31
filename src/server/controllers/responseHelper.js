"use strict";

module.exports = {
    sendResponse: (response, data) => {
        response.send({ d: data });
    }
};
