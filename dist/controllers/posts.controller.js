"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const decors_1 = require("../common/decors");
const stub_1 = require("../stub");
let PostsController = class PostsController {
    getListPosts() {
        return stub_1.postsStub;
    }
    getOnePost(id) {
        console.log(id.params);
        return 'not implemented yet';
    }
};
__decorate([
    decors_1.Get('')
], PostsController.prototype, "getListPosts", null);
__decorate([
    decors_1.Get('/:id'),
    __param(0, decors_1.Param('id'))
], PostsController.prototype, "getOnePost", null);
PostsController = __decorate([
    decors_1.Controller('/posts')
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map