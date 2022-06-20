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
exports.roundModel = exports.gameModel = exports.friendModel = exports.gameSchema = exports.roundSchema = exports.friendSchema = void 0;
var mongoose = __importStar(require("mongoose"));
exports.friendSchema = new mongoose.Schema({
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Games' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
}, {
    timestamps: true,
    strict: false
});
exports.roundSchema = new mongoose.Schema({
    friendship: { type: mongoose.Schema.Types.ObjectId, ref: 'Friend' },
    request: { type: mongoose.Schema.Types.Mixed, required: true, default: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true,
    strict: false
});
exports.gameSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    word: { type: String },
    guesses: [{ type: String }],
    completed: { type: Boolean, default: false }
}, {
    timestamps: true,
    strict: false
});
exports.friendModel = mongoose.model('Friend', exports.friendSchema);
exports.gameModel = mongoose.model('Player', exports.gameSchema);
exports.roundModel = mongoose.model('Games', exports.roundSchema);
