"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var lib_1 = require("../../lib");
var Keyboard_1 = __importDefault(require("../Game/Keyboard"));
var NewGame = function () {
    var _a = react_1.useState([]), arr = _a[0], setArr = _a[1];
    var _b = react_1.useState([]), opp = _b[0], setOpp = _b[1];
    var _c = react_router_dom_1.useParams(), friend = _c.friend, game = _c.game;
    var history = react_router_dom_1.useHistory();
    react_1.useEffect(function () {
        getFriendship();
    }, []);
    var getFriendship = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, opponent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("/api/getFriendship/" + friend, lib_1.headers)];
                case 1:
                    res = _a.sent();
                    opponent = res.data.users.filter(function (u) { return u._id !== lib_1.userId(); })[0];
                    setOpp(opponent);
                    return [2 /*return*/];
            }
        });
    }); };
    var newGame = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post('/api/newFriendGame/', { user: opp, word: arr.join(''), friendship: friend }, lib_1.headers)];
                case 1:
                    _a.sent();
                    history.push("/friend/" + friend);
                    return [2 /*return*/];
            }
        });
    }); };
    var acceptReq = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("/api/acceptRequest/" + game, { user: opp, word: arr.join('') }, lib_1.headers)];
                case 1:
                    _a.sent();
                    history.push("/friend/" + friend);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className='bm'>
      <h1> New Game</h1>

      <div className='top'>
        <div className='flex fw'>
          {__spreadArray([], Array(5)).map(function (l, i) {
            return <div key={i} className='letter'> {arr.length > i ? arr[i] : null} </div>;
        })}
        </div> 
        <div className='random'>
          <button className='button' onClick={function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = setArr;
                return [4 /*yield*/, lib_1.getRandom()];
            case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).split('')])];
        }
    }); }); }}>
            <small> + Random</small></button>
        </div> 
      </div>

      <Keyboard_1.default word={[]} guess={[]} arr={arr} setArr={setArr} onSubmit={game ? acceptReq : newGame}/>
    </div>);
};
exports.default = NewGame;
