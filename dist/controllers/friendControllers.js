"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendship = exports.getFriends = exports.newFriend = exports.totalScore = exports.declineRequest = exports.newInputGame = exports.getFriendGames = void 0;
var models_1 = require("../models");
var mongoose_1 = __importDefault(require("mongoose"));
var getFriendGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var game, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.roundModel.aggregate([
                        { $match: { friendship: new mongoose_1.default.Types.ObjectId(req.params.id) } },
                        { $sort: { createdAt: -1 } },
                        { $skip: req.body.skip },
                        { $limit: req.body.limit },
                        { $lookup: {
                                from: 'players',
                                localField: 'players',
                                foreignField: '_id',
                                as: 'players'
                            } },
                        { $unwind: '$players' },
                        { $lookup: {
                                from: 'users',
                                localField: 'players.user',
                                foreignField: '_id',
                                as: 'players.user'
                            } },
                        { $unwind: '$players.user' },
                        {
                            $project: {
                                _id: 1,
                                friendship: 1,
                                players: 1,
                                request: 1,
                                priority: { $eq: ['$players.user._id', req.currentUser._id] }
                            }
                        },
                        {
                            $sort: {
                                priority: -1
                            }
                        },
                        {
                            $group: {
                                _id: '$_id',
                                friendship: { $first: '$friendship' },
                                players: { $push: '$players' },
                                request: { $first: '$request' }
                            }
                        }
                    ])];
            case 1:
                game = _a.sent();
                res.status(201).json(game);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(401).json(err_1);
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFriendGames = getFriendGames;
var newInputGame = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lastGame, game, round, player2, game, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, models_1.roundModel.find({ friendship: req.body.friendship })
                        .limit(1)
                        .sort({ $natural: -1 })];
            case 1:
                lastGame = (_a.sent())[0];
                if (!(!lastGame || lastGame.players.length === 2)) return [3 /*break*/, 4];
                return [4 /*yield*/, models_1.gameModel.create(req.body)];
            case 2:
                game = (_a.sent());
                return [4 /*yield*/, models_1.roundModel.create({ players: [game], friendship: req.body.friendship })];
            case 3:
                round = _a.sent();
                res.status(201).json(round);
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, models_1.gameModel.create(req.body)];
            case 5:
                player2 = _a.sent();
                return [4 /*yield*/, models_1.roundModel.findByIdAndUpdate(lastGame.id, { request: false, $push: { players: player2 } }, { new: true })
                        .populate({ path: 'players',
                        populate: {
                            path: 'user',
                            model: 'User'
                        }
                    })];
            case 6:
                game = _a.sent();
                res.status(201).json(game);
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.newInputGame = newInputGame;
var declineRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var game, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.roundModel.findByIdAndDelete(req.params.id)];
            case 1:
                game = _a.sent();
                res.status(201).json(game);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(401).json(err_3);
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.declineRequest = declineRequest;
var totalScore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var scores, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.roundModel.aggregate([
                        { $match: { friendship: new mongoose_1.default.Types.ObjectId(req.params.id) } },
                        { $lookup: {
                                from: 'players',
                                localField: 'players',
                                foreignField: '_id',
                                as: 'players'
                            } },
                        {
                            $redact: {
                                $cond: {
                                    if: {
                                        $eq: [{
                                                $allElementsTrue: {
                                                    $map: {
                                                        input: '$players',
                                                        in: '$$this.completed'
                                                    }
                                                }
                                            },
                                            true]
                                    },
                                    then: '$$KEEP',
                                    else: '$$PRUNE'
                                }
                            }
                        },
                        {
                            $project: {
                                winners: {
                                    $filter: {
                                        input: '$players',
                                        cond: {
                                            $eq: [{ $size: '$$this.guesses' },
                                                { $min: {
                                                        $map: {
                                                            input: '$players.guesses',
                                                            in: { $size: '$$this' }
                                                        }
                                                    } }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        {
                            $match: { winners: { $size: 1 } }
                        },
                        {
                            $group: { _id: '$winners.user', score: { $sum: 1 } }
                        },
                        {
                            $addFields: { _id: { $arrayElemAt: ['$_id', 0] } }
                        },
                        {
                            $project: {
                                _id: 1,
                                score: 1,
                                priority: { $eq: ['$_id', req.currentUser._id] }
                            }
                        },
                        {
                            $sort: {
                                priority: -1
                            }
                        }
                    ])];
            case 1:
                scores = _a.sent();
                res.status(201).json(scores);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(401).json(err_4);
                console.log(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.totalScore = totalScore;
//------------
var newFriend = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, friend, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                users = { users: [req.body.user, req.currentUser] };
                return [4 /*yield*/, models_1.friendModel.create(users)];
            case 1:
                friend = _a.sent();
                res.status(201).json(friend);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(401).json(err_5);
                console.log(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.newFriend = newFriend;
var getFriends = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var friends, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.friendModel.find({ users: { '$in': [req.currentUser] } })
                        .select('users')
                        .populate({
                        'path': 'users',
                        'match': { '_id': { $ne: req.currentUser._id } }
                    })];
            case 1:
                friends = _a.sent();
                res.status(201).json(friends);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(401).json(err_6);
                console.log(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFriends = getFriends;
var getFriendship = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var friends, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.friendModel.findById(req.params.id)
                        .populate('users')];
            case 1:
                friends = _a.sent();
                res.status(201).json(friends);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(401).json(err_7);
                console.log(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFriendship = getFriendship;
