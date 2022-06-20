"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var express = require('express');
var json = require('body-parser').json;
require('dotenv').config();
var router_1 = require("./router");
var app = express();
var PORT = process.env.PORT || 8000;
mongoose_1.default.connect("mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.iagak.mongodb.net/wurdle?retryWrites=true&w=majority"), function (err) {
    if (err)
        return console.log(err);
    console.log('Mongo is Connected!');
});
var db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('Connected successfully');
});
app.use(json());
app.use('/api', router_1.router);
app.get('*', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, 'build', 'index.html'));
});
// app.use(express.static(path.join(__dirname, 'dist')))
app.listen(PORT, function () {
    console.log('listening on port 8000');
});
