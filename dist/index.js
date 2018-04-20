"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
var compression = require("compression");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
mongoose.connect("mongodb://localhost:27017/above22water");
mongoose.connection.on("error", function () {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var MongoStore = require("connect-mongo")(session);
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "bullyAI-youfuckingsuck",
    store: new MongoStore({
        host: "127.0.0.1",
        port: "27017",
        db: "session",
        url: "mongodb://localhost:27017/bullyAI",
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
var routes_1 = require("./routes");
app.use('/', routes_1.routes);
server.listen(app.get("port"), function () {
    console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("Press CTRL-C to stop\n");
});
//# sourceMappingURL=index.js.map