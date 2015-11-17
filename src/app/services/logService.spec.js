(function () {
    "use strict";

    var service,
        openParams,
        headerParams,
        sendParams;

    beforeEach(module("dtServices"));

    describe("Log Service Tests", function () {

        beforeEach(inject(function (dtLogService) {

            service = dtLogService;

            openParams = { method: "", path: "", isAsync: false };
            headerParams = { key: "", value: "" };
            sendParams = { obj: "" };

            XMLHttpRequest = function () { };
            XMLHttpRequest.prototype.open = function (method, path, isAsync) {
                openParams.method = method;
                openParams.path = path;
                openParams.isAsync = isAsync;
            };
            XMLHttpRequest.prototype.setRequestHeader = function(key, value) {
                headerParams.key = key;
                headerParams.value = value;
            };
            XMLHttpRequest.prototype.send = function(obj) {
                sendParams.obj = obj;
            };

        }));

        it("should send log message to server appropriately", function () {

            var log = "foo bar";
            service.save(log);

            expect(openParams).toEqual({ method: "post", path: "api/logs", isAsync: true });
            expect(headerParams).toEqual({ key: "Content-Type", value: "application/json" });
            expect(sendParams).toEqual({ obj: '"foo bar"' });

        });

    });

}());