"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
exports.AccountSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    username: String,
    password: String
});
exports.AccountSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
exports.AccountSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
exports.Account = mongoose.model("Account", exports.AccountSchema);
//# sourceMappingURL=account.js.map