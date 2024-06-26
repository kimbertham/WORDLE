"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var router_1 = require("./router");
require('dotenv').config();
var socketio = require('socket.io');
var http = require('http');
var express = require('express');
var json = require('body-parser').json;
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
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve('frontend', 'build', 'index.html'));
    });
}
// app.listen(PORT, () => {
//   console.log('listening on port 8000')
// })
var server = http.createServer(app);
var io = socketio(server, { cors: { origin: '*' } });
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () { return console.log('User Disconnected'); });
    socket.on('joinroom', function (data) { return socket.join(data); });
    socket.on('fetch', function (id) { return socket.to(id).emit('fetch', id); });
});
server.listen(PORT, function () { return console.log('socket server on 4000'); });
