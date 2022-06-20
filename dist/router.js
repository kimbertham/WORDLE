"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var secureRoute = require('./auth/secureRoute').secureRoute;
var soloControllers = require('./controllers/soloControllers');
var friendControllers = require('./controllers/friendControllers');
var auth = require('./auth/authControlers');
var Router = require('express').Router;
exports.router = Router();
exports.router.route('/login')
    .post(auth.login);
exports.router.route('/register')
    .post(auth.register);
//------
exports.router.route('/find')
    .post(secureRoute, auth.findUsers);
exports.router.route('/newFriend')
    .post(secureRoute, friendControllers.newFriend);
exports.router.route('/getFriendship/:id')
    .get(secureRoute, friendControllers.getFriendship);
exports.router.route('/getFriends')
    .post(secureRoute, friendControllers.getFriends);
//----------
exports.router.route('/newSoloGame')
    .post(secureRoute, soloControllers.newSoloGame);
exports.router.route('/getLastSolo')
    .get(secureRoute, soloControllers.getLastSolo);
exports.router.route('/getSoloGames/:id')
    .post(secureRoute, soloControllers.getSoloGames);
exports.router.route('/updateGame/:id')
    .post(secureRoute, soloControllers.updateGame);
exports.router.route('/completeGame/:id')
    .post(secureRoute, soloControllers.completeGame);
//----------------
exports.router.route('/newFriendGame')
    .post(secureRoute, friendControllers.newFriendGame);
exports.router.route('/getFriendGames/:id')
    .post(secureRoute, friendControllers.getFriendGames);
exports.router.route('/acceptRequest/:id')
    .post(secureRoute, friendControllers.acceptRequest);
exports.router.route('/declineRequest/:id')
    .get(secureRoute, friendControllers.declineRequest);
exports.router.route('/totalScore/:id')
    .get(secureRoute, friendControllers.totalScore);
