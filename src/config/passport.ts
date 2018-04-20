
import * as passportLocal from "passport-local";
import { Account } from "../database/account";
import { Request, Response, NextFunction } from "express";
import { PassportStatic } from "passport";

const LocalStrategy = passportLocal.Strategy;

module.exports = function(passport: PassportStatic) {

    passport.serializeUser<any, any>((account, done) => {
        done(undefined, account.id);
    });

    passport.deserializeUser((id, done) => {
        Account.findById(id, (err: Error, account: any) => {
            done(err, account);
        });
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField : "username",
        passwordField : "password",
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req: Request, username: string, password: string, done) {
        process.nextTick(function() {
            Account.findOne({ "username" :  username }, function(err: Error, user: JSON) {
                if (err) { return done(err); }
                if (user) {
                    // return done(undefined, false, req.flash("signupMessage", "That username is already taken."));
                    return done(undefined, false, undefined);
                } else {
                    const newUser           = new Account();
                    newUser.username        = username;
                    newUser.password        = newUser.generateHash(password);
                    newUser.save(function(err: Error) {
                        if (err)
                            throw err;
                        return done(undefined, newUser);
                    });
                }
            });
        });
    }));

    passport.use("local-login", new LocalStrategy({
        usernameField : "username",
        passwordField : "password",
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req: Request, username, password, done) {
        process.nextTick(function() {
            Account.findOne({ "username" :  username }, function(err: Error, user: any) {
                if (err) { return done(err); }
                if (!user) {
                    // return done(undefined, false, req.flash("loginMessage", "No user found."));
                    return done(undefined, false, undefined);
                }
                if (!user.validPassword(password)) {
                    // return done(undefined, false, req.flash("loginMessage", "Wrong password."));
                    return done(undefined, false, undefined);
                }
                return done(undefined, user);
            });
        });
    }));
};