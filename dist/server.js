"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const posts_controller_1 = require("./controllers/posts.controller");
const app = new app_1.default([posts_controller_1.PostsController], 3000);
app.listen();
//# sourceMappingURL=server.js.map