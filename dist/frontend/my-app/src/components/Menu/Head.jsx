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
var Menu_1 = __importDefault(require("./Menu"));
var Friend_1 = __importDefault(require("./Friend"));
var Solo_1 = __importDefault(require("./Solo"));
var Head = function (_a) {
    var friend = _a.friend;
    var _b = (0, react_1.useState)(false), menu = _b[0], setMenu = _b[1];
    var _c = (0, react_1.useState)(false), friendMenu = _c[0], setFriendMenu = _c[1];
    var _d = (0, react_1.useState)(false), soloMenu = _d[0], setSoloMenu = _d[1];
    return (<div className='navCont'>
      <div className='nav'>
        <img src={require('../../styles/menu.jpg')} className='navItem' onClick={function () {
            setMenu(!menu);
            setFriendMenu(false);
            setSoloMenu(false);
        }}/>

        <div className='logo'>Wurhdle</div>

        <img src={require('../../styles/time.jpg')} className='navItem' onClick={function () {
            if (friend) {
                setFriendMenu(!friendMenu);
                setMenu(false);
            }
            else {
                setSoloMenu(!soloMenu);
                setMenu(false);
            }
        }}/>
      </div>

      {menu && <Menu_1.default />}
      {friendMenu && <Friend_1.default _id={friend}/>}
      {soloMenu && <Solo_1.default />}

    </div>);
};
exports.default = Head;
