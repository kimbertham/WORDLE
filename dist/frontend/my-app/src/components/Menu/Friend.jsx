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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var lib_1 = require("../../lib");
var Word_1 = __importDefault(require("../Game/Word"));
var FriendMenu = function (_a) {
    var _id = _a._id;
    var _b = (0, react_1.useState)([]), games = _b[0], setGames = _b[1];
    var _c = (0, react_1.useState)(0), index = _c[0], setIndex = _c[1];
    var _d = (0, react_1.useState)(), selected = _d[0], setSelected = _d[1];
    var _e = (0, react_1.useState)(false), hide = _e[0], setHide = _e[1];
    (0, react_1.useEffect)(function () {
        getGames();
    }, []);
    var getGames = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("/api/getFriendGames/".concat(_id), { skip: index, limit: 5 }, lib_1.headers)];
                case 1:
                    res = (_a.sent()).data;
                    if (res.length < 5)
                        setHide(true);
                    setGames(games.length === 0 ? res : __spreadArray(__spreadArray([], games, true), res, true));
                    setIndex(index + 5);
                    return [2 /*return*/];
            }
        });
    }); };
    if (!games)
        return <p>No games yet...</p>;
    return (<div className='friendMenu'>

      {selected &&
            <div>
          <div className='close'>
            <button className='button' onClick={function () { return setSelected(null); }}> back</button>
          </div>

          <div className='showPastCont'>
            {selected.players.map(function (p) {
                    return <div className='showPast'>
                <h1>{(0, lib_1.cap)(p.user.username)}</h1>
                <Word_1.default arr={[]} guess={p.guesses} word={p.word.split('')}/> 
              </div>;
                })}
          </div>
        </div>}
      
      {!selected && games.length > 0 &&
            <div>
        {games.map(function (g) {
                    return <div key={g._id} className='pastGames' onClick={function () { return setSelected(g); }}>
            <div className='small'>
              <Word_1.default arr={[]} guess={g.players[0].guesses} word={g.players[1].word.split('')}/>
            </div>
            <div>
              <p>{(0, lib_1.cap)(g.players[1].word)}</p>
              <p>Guesses: {g.players[0].guesses.length}/6</p>
              <p>Score: {g.players[0].guesses.length}:{g.players[1].guesses.length}</p>
              <p>Winner: {g.players[0].guesses.length > g.players[1].guesses.length ?
                            g.players[1].user.username : g.players[0].user.username}</p>
            </div>
          </div>;
                })}

        <div className='hide'>
          {!hide ? <button onClick={getGames} className='button'>Load More...</button>
                    : <small>No more games ....</small>}
        </div>
      </div>}

    </div>);
};
exports.default = FriendMenu;
