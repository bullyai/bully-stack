"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passportLocal = require("passport-local");
const account_1 = require("../database/account");
const LocalStrategy = passportLocal.Strategy;
module.exports = function (passport) {
    passport.serializeUser((account, done) => {
        done(undefined, account.id);
    });
    passport.deserializeUser((id, done) => {
        account_1.Account.findById(id, (err, account) => {
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
                    const newUser = new account_1.Account();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(undefined, newUser);
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