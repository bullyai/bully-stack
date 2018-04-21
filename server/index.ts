// Inital server setup
// ----------------------------------------------------------------------------
import * as express from "express";
import * as http from "http";
const app = express();
const server = http.createServer(app);

// Utilities
// ----------------------------------------------------------------------------
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as passport from "passport";

import * as logger from "morgan";
import * as errorHandler from "errorhandler";

// MongooseDB
// ----------------------------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/bullyAI");
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

// Server Configuration
// ----------------------------------------------------------------------------
app.set("port", process.env.PORT || 3000);
// Static content delivery compression
app.use(compression());
// URL/URI and HTTP content decoding and parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie content decoding and parsing
app.use(cookieParser());
// Mounts the session store with an auto loader into MongooseDB
const MongoStore = require("connect-mongo")(session);
// Allows the session storage to be put into mongoose
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
// Starts the user account session
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));

// Request Routing
// ----------------------------------------------------------------------------
// Always feel ashamed for doing this...
// app.use("/",                            express.static(__dirname + "/../client/"));
app.use(express.static('client'));

app.all('*', (req, res, next) => {
    console.log(req.path);
    console.log(req.url);
    console.log(req.originalUrl);
    next();
});

// Normal Code
// ----------------------------------------------------------------------------

// Importing Passport configuration
require("./config/passport")(passport); // Passport configuration

import { routes } from "./routes";
import { accountRoutes } from "./api";
app.use('/', routes);
app.use('/account', accountRoutes);

app.use(errorHandler());

// Start Express server.
// ----------------------------------------------------------------------------
server.listen(app.get("port"), () => {
    console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("Press CTRL-C to stop\n");
});