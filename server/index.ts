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
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as cors from "cors";

import * as logger from "morgan";
import * as errorHandler from "errorhandler";

// Server Configuration
// ----------------------------------------------------------------------------
app.set("port", process.env.PORT || 3000);
app.use(cors({ origin: true }));
// Static content delivery compression
app.use(compression());
// URL/URI and HTTP content decoding and parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie content decoding and parsing
app.use(cookieParser());
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

import { routes } from "./routes";
import { apiRoutes } from "./api";
app.use('/', routes);
app.use('/api', apiRoutes);

app.use(errorHandler());

// Start Express server.
// ----------------------------------------------------------------------------
server.listen(app.get("port"), () => {
    console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("Press CTRL-C to stop\n");
});