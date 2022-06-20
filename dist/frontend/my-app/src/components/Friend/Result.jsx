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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var lib_1 = require("../../lib");
var Score_1 = __importDefault(require("./Score"));
var Word_1 = __importDefault(require("../Game/Word"));
var friendResult = function (_a) {
    var currentRound = _a.currentRound, setResult = _a.setResult;
    var _b = (0, react_1.useState)(false), showOpp = _b[0], setShowOpp = _b[1];
    var history = (0, react_router_dom_1.useHistory)();
    var p1 = currentRound.players[0];
    var p2 = currentRound.players[1];
    var getWinner = function () {
        if (p1.completed && p2.completed) {
            return p1.guesses.length > p2.guesses.length ?
                p2.user.username
                : p1.guesses.length === p2.guesses.length ? 'TIE'
                    : p1.user.username;
        }
        else {
            return 'TBA';
        }
    };
    return (<div className='res'>
      <div className='rmid'>

        {!showOpp && <>

          <div className='exit'>
            <p onClick={function () { return setResult(false); }}>X</p>
          </div>

          <div className='winner'>
            <p>Winner</p>
            <h1>{(0, lib_1.cap)(getWinner())}</h1> 
          </div>

          <div className='resScores'>
            <div>
              <h2>{(0, lib_1.cap)(p1.user.username)}</h2>
              <p>Word: {p1.word}</p>
              <p>{p1.completed ?
                "Guesses:".concat(p1.guesses.length, "/6")
                : "".concat(p1.user.username, " hasnt made their guesses yet")}</p>
            </div>

            <div>
              <h2>{(0, lib_1.cap)(p2.user.username)}</h2>
              <p>Word: {p2.word}</p>
              <p>{p2.completed ?
                "Guesses:".concat(p2.guesses.length, "/6")
                : "".concat(p2.user.username, " hasnt made their guesses yet")}</p>
            </div>
          </div>

          <Score_1.default currentRound={currentRound}/>
    
          {p1.completed && p2.completed &&
                <div className='buttons'>
            <button onClick={function () { return history.push("/new/".concat(currentRound.friendship)); }}> 
              <p>New Game </p>
            </button>
            <button onClick={function () { return setShowOpp(true); }}>See {p2.user.username}'s Game</button>
          </div>}
        </>}  
      
        {showOpp &&
            <div className='resShow'>
              <h1>{p2.word}</h1>
              <Word_1.default arr={[]} guess={p2.guesses} word={p2.word.split('')}/> 
              <button className='button' onClick={function () { return setShowOpp(false); }}>back</button>
            </div>}
        
      </div>
    </div>);
};
exports.default = friendResult;
