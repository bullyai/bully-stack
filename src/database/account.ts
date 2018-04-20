import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

export interface IAccountModel extends mongoose.Document {
    username: string;
    password: string;
    generateHash(password: string): string;
    validPassword(password: string): boolean;
    createdAt: Date;
}

export const AccountSchema: mongoose.Schema = new mongoose.Schema({
    createdAt : { type: Date, default: Date.now },
    username: String,
    password: String
});

// Hashing password
AccountSchema.methods.generateHash = function(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Checking if password is valid
AccountSchema.methods.validPassword = function(password: string) {
    return bcrypt.compareSync(password, this.password);
};

export const Account: mongoose.Model<IAccountModel> = mongoose.model<IAccountModel>("Account", AccountSchema);