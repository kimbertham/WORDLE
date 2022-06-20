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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var lib_1 = require("../../lib");
var rows = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
var Keyboard = function (_a) {
    var arr = _a.arr, setArr = _a.setArr, onSubmit = _a.onSubmit, guess = _a.guess, word = _a.word, disabled = _a.disabled;
    var _b = react_1.useState([]), green = _b[0], setGreen = _b[1];
    var _c = react_1.useState(), err = _c[0], setErr = _c[1];
    react_1.useEffect(function () {
        var _a;
        (_a = __spreadArray([], guess).pop()) === null || _a === void 0 ? void 0 : _a.split('').forEach(function (letter, i) {
            return word[i] === letter && !green.includes(letter) && setGreen(__spreadArray(__spreadArray([], green), [letter]));
        }),
            [guess];
    });
    var delType = function () { return setArr(arr.slice(0, -1)); };
    var setLetter = function (l) { return arr.length < 6 && setArr(__spreadArray(__spreadArray([], arr), [l])); };
    var check = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(arr.length <= 4)) return [3 /*break*/, 1];
                    setErr('Word too short!');
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, lib_1.checkWord(__spreadArray([], arr).join(''))];
                case 2:
                    if (!(_a.sent())) {
                        setErr('Not a word');
                    }
                    else {
                        setErr(null);
                        onSubmit();
                    }
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var key = function (l) { return (<div id={l} key={l} onClick={function () { return disabled ? null : setLetter(l); }} className={"key\n    \n      " + (__spreadArray([], guess).join(' ').split('').includes(l) && word.includes(l) && !green.includes(l) ? 'yellow' : '') + "\n      " + (__spreadArray([], guess).join(' ').split('').includes(l) && !word.includes(l) && 'grey') + "\n      " + (green.includes(l) && 'green') + "\n      "}>
      <p>{l}</p>
    </div>); };
    return (<div className='keyboard'>

      {err && err}
      <div className='flex'>{__spreadArray([], rows).splice(0, 10).map(function (l) { return key(l); })}</div>
      <div className='flex'>{__spreadArray([], rows).splice(10, 9).map(function (l) { return key(l); })}</div>

      <div className='flex'>
        <div onClick={function () { return check(); }} className='keyLong'>Enter</div>
        <div className='flex'>{__spreadArray([], rows).splice(19, 9).map(function (l) { return key(l); })}</div>
        <div onClick={function () { return delType(); }} className='keyLong'>Back</div>
      </div>

    </div>);
};
exports.default = Keyboard;