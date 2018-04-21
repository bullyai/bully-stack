"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
const routes = express_1.Router();
exports.routes = routes;
routes.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../../client/main.html"));
});
//# sourceMappingURL=routes.js.map