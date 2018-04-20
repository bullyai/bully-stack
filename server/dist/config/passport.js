"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passportLocal = require("passport-local");
var account_1 = require("../database/account");
var LocalStrategy = passportLocal.Strategy;
module.exports = function (passport) {
    passport.serializeUser(function (account, done) {
        done(undefined, account.id);
    });
    passport.deserializeUser(function (id, done) {
        account_1.Account.findById(id, function (err, account) {
            done(err, account);
        });
    });
    passport.use("local-signup", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            account_1.Account.findOne({ "username": username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(undefined, false, undefined);
                }
                else {
                    var newUser_1 = new account_1.Account();
                    newUser_1.username = username;
                    newUser_1.password = newUser_1.generateHash(password);
                    newUser_1.save(function (err) {
                        if (err)
                            throw err;
                        return done(undefined, newUser_1);
                    });
                }
            });
        });
    }));
    passport.use("local-login", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            account_1.Account.findOne({ "username": username }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(undefined, false, undefined);
                }
                if (!user.validPassword(password)) {
                    return done(undefined, false, undefined);
                }
                return done(undefined, user);
            });
        });
    }));
};
//# sourceMappingURL=passport.js.map