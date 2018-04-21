"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("errorhandler");
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const MongoStore = require("connect-mongo")(session);
app.use(logger("dev"));
app.use(express.static('client'));
app.all('*', (req, res, next) => {
    console.log(req.path);
    console.log(req.url);
    console.log(req.originalUrl);
    next();
});
const routes_1 = require("./routes");
const api_1 = require("./api");
app.use('/', routes_1.routes);
app.use('/account', api_1.accountRoutes);
app.use(errorHandler());
server.listen(app.get("port"), () => {
    console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("Press CTRL-C to stop\n");
});
//# sourceMappingURL=index.js.map