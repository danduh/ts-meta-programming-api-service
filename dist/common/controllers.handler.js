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
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllersHandler = void 0;
require("reflect-metadata");
const path = __importStar(require("path"));
function controllersHandler(controllers, app) {
    console.log('controllersHandler', controllers);
    for (const controller of controllers) {
        const isController = Reflect.hasMetadata('basePath', controller);
        const hasRoutes = Reflect.hasMetadata('routes', controller.prototype);
        if (isController && hasRoutes) {
            const basePath = Reflect.getMetadata('basePath', controller);
            const routes = Reflect.getMetadata('routes', controller.prototype);
            let curPath, curRouteHandler;
            routes.forEach((route) => {
                curPath = path.posix.join('/', basePath, route.path);
                curRouteHandler = controller.prototype[route.propertyKey];
                app[route.method](curPath, curRouteHandler);
                console.info(`router: ${controller.name}.${route.propertyKey} [${route.method}] ${curPath}`);
            });
        }
    }
}
exports.controllersHandler = controllersHandler;
//# sourceMappingURL=controllers.handler.js.map