"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var mongoose = __importStar(require("mongoose"));
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, required: true }
});
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.pre('save', function hashPassword(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    }
    next();
});
exports.userModel = mongoose.model('User', userSchema);
