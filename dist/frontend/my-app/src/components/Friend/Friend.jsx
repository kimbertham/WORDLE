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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var lib_1 = require("../../lib");
var Request_1 = __importDefault(require("./Request"));
var Main_1 = __importDefault(require("../Game/Main"));
var Result_1 = __importDefault(require("./Result"));
var Score_1 = __importDefault(require("./Score"));
var Friend = function (_a) {
    var setFriend = _a.setFriend;
    var id = (0, react_router_dom_1.useParams)().id;
    var history = (0, react_router_dom_1.useHistory)();
    var _b = (0, react_1.useState)(true), request = _b[0], setRequest = _b[1];
    var _c = (0, react_1.useState)(false), result = _c[0], setResult = _c[1];
    var _d = (0, react_1.useState)(), currentRound = _d[0], setCurrentRound = _d[1];
    (0, react_1.useEffect)(function () {
        setFriend(id);
        getLastRound();
    }, []);
    (0, react_1.useEffect)(function () {
        result && getLastRound();
    }, [result]);
    var getLastRound = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("/api/getFriendGames/".concat(id), { skip: 0, limit: 1 }, lib_1.headers)];
                case 1:
                    res = (_a.sent()).data[0];
                    if (res) {
                        setCurrentRound(res);
                        if (res.players[0].completed) {
                            setResult(true);
                        }
                        if (res.request) {
                            setRequest(true);
                        }
                    }
                    else {
                        history.push("/new/".concat(id));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    if (!currentRound)
        return null;
    if (currentRound.request && request)
        return (<Request_1.default setRequest={setRequest} currentRound={currentRound} setCurrentRound={setCurrentRound}/>);
    return (<>

      <Score_1.default currentRound={currentRound}/>

      {result &&
            <Result_1.default currentRound={currentRound} setResult={setResult}/>}
      
      <Main_1.default game={currentRound.players[0]} word={currentRound.players[0].word.split('')} setResult={setResult}/>
    </>);
};
exports.default = Friend;
