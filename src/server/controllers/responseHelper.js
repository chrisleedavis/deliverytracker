module.exports = {
    sendResponse: function(response, data) {
        response.send({ d: data });
    }
};
