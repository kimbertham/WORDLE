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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsers = exports.register = exports.login = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var userModel_1 = require("./userModel");
var jwt = require('jsonwebtoken');
var secret = 'secret';
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1.userModel.findOne({ username: req.body.username })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('No User Found');
                }
                if (!user.validatePassword(req.body.password)) {
                    throw new Error('Unauthorized Wrong Password');
                }
                token = jwt.sign({ sub: user._id }, secret, { expiresIn: '30 days' });
                res.status(202).json({ user: user, token: token });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(401).json({ message: 'Invalid Credentials' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log(req.body);
                return [4 /*yield*/, userModel_1.userModel.create(req.body)];
            case 1:
                user = _a.sent();
                res.status(201).json(user);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(401).json(err_2);
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var findUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, _a, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                if (!(req.body.username !== '')) return [3 /*break*/, 2];
                return [4 /*yield*/, userModel_1.userModel.find({ '$and': [{ '_id': { '$ne': req.currentUser._id } },
                            { 'username': { '$regex': req.body.username, '$options': 'i' } }]
                    })];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = [];
                _b.label = 3;
            case 3:
                users = _a;
                res.status(201).json(users);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                res.status(401).json(err_3);
                console.log(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.findUsers = findUsers;
