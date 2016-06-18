"use strict";

const BaseController = require("./baseController"),
    Route = require("../models/routeModel");

class RoutesController extends BaseController {

    constructor() {
        super();
    }

    addRoute(request, response) {

        const route = new Route(request.body);

        route.createdBy = request.user._id;
        route.save()
            .then((e) => {
                super.handleResponse(response, e);
            })
            .catch((err) => {
                super.handleError(response, err);
            });
    }

    findAllRoutes(request, response) {

        super.findAll(request, response, Route);
    }
}

module.exports = RoutesController;
