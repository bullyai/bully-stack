"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = require("path");
var routes = express_1.Router();
exports.routes = routes;
routes.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, "./../../client/main.html"));
});
//# sourceMappingURL=routes.js.map