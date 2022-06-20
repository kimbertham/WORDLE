"use strict";
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
var react_1 = __importDefault(require("react"));
var Word = function (_a) {
    var word = _a.word, arr = _a.arr, guess = _a.guess;
    var currentGuess = function (i, e) {
        return <div key={e} className={"letter ".concat(word === arr && 'green')}>
      <p>{arr[e]}</p>
    </div>;
    };
    var pastGuess = function (i, e) {
        return <div key={e} className={"letter ".concat(guess[i].split('')[e] === word[e] ? 'green'
                : word.includes(guess[i].split('')[e]) ? 'yellow' : 'grey')}>
      <p>{guess[i].split('')[e]} </p> 
    </div>;
    };
    return (<div className='wordRow'>

      {__spreadArray([], Array(6), true).map(function (e, i) {
            return <div className='flex fw' key={i}>
          {guess.length === i ? __spreadArray([], Array(word.length), true).map(function (l, e) { return currentGuess(i, e); })
                    : i < guess.length ? __spreadArray([], Array(word.length), true).map(function (l, e) { return pastGuess(i, e); })
                        : __spreadArray([], Array(word.length), true).map(function (l, i) { return <div key={i} className='letter'></div>; })}
        </div>;
        })}  

    </div>);
};
exports.default = Word;
