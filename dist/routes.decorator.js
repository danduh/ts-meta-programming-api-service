"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
exports.appRouter = express_1.Router();
function RoutesDecorator(options) {
    return (target, propertyKey, descriptor) => {
        exports.appRouter[options.method](options.path, target[propertyKey]);
    };
}
exports.default = RoutesDecorator;
//# sourceMappingURL=routes.decorator.js.map