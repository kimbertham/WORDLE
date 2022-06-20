"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = require("react-dom/client");
var App_1 = __importDefault(require("./App"));
require("./main.scss");
var react_2 = require("react");
var rootElement = document.getElementById('root');
var root = (0, client_1.createRoot)(rootElement);
root.render(<react_2.StrictMode>
    <App_1.default />
  </react_2.StrictMode>);
