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
var Login_1 = __importDefault(require("./components/Login"));
var Head_1 = __importDefault(require("./components/Menu/Head"));
var Friend_1 = __importDefault(require("./components/Friend/Friend"));
var Home_1 = __importDefault(require("./components/Home"));
var New_1 = __importDefault(require("./components/Friend/New"));
var App = function () {
    var _a = (0, react_1.useState)(''), friend = _a[0], setFriend = _a[1];
    return (<react_router_dom_1.BrowserRouter>
      <Head_1.default friend={friend}/>
      <react_router_dom_1.Switch>
        <react_router_dom_1.Route path='/login' component={Login_1.default}/> 
        <react_router_dom_1.Route path='/friend/:id/' component={function () { return <Friend_1.default setFriend={setFriend}/>; }}/> 
        <react_router_dom_1.Route path='/new/:friend/:game' component={New_1.default}/>
        <react_router_dom_1.Route path='/new/:friend' component={New_1.default}/>
        <react_router_dom_1.Route exact path='/' component={Home_1.default}/> 

      </react_router_dom_1.Switch> 

    
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
