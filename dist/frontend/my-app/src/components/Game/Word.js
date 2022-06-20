"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Word = function (_a) {
    var word = _a.word, arr = _a.arr, guess = _a.guess;
    var currentGuess = function (i, e) {
        return <div key={e} className={"letter " + (word === arr && 'green')}>
      <p>{arr[e]}</p>
    </div>;
    };
    var pastGuess = function (i, e) {
        return <div key={e} className={"letter " + (guess[i].split('')[e] === word[e] ? 'green'
                : word.includes(guess[i].split('')[e]) ? 'yellow' : 'grey')}>
      <p>{guess[i].split('')[e]} </p> 
    </div>;
    };
    return (<div className='wordRow'>

      {__spreadArray([], Array(6)).map(function (e, i) {
            return <div className='flex fw' key={i}>
          {guess.length === i ? __spreadArray([], Array(word.length)).map(function (l, e) { return currentGuess(i, e); })
                    : i < guess.length ? __spreadArray([], Array(word.length)).map(function (l, e) { return pastGuess(i, e); })
                        : __spreadArray([], Array(word.length)).map(function (l, i) { return <div key={i} className='letter'></div>; })}
        </div>;
        })}  

    </div>);
};
exports.default = Word;
