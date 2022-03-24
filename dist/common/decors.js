"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = exports.Get = exports.createRouterDecorator = exports.Controller = void 0;
require("reflect-metadata");
function Controller(path = '') {
    return (target) => {
        console.log('Controller', target);
        Reflect.defineMetadata('basePath', path, target);
    };
}
exports.Controller = Controller;
function createRouterDecorator(method) {
    return (path) => (target, propertyKey, descriptor) => {
        const route = {
            propertyKey,
            method,
            path: path || '',
        };
        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
        const routes = Reflect.getMetadata('routes', target);
        routes.push(route);
        const ordinalMethod = descriptor.value;
        descriptor.value = (...args) => {
            let [request, response] = args;
            const result = ordinalMethod.apply(this, args);
            console.log(result);
            response.send(result);
        };
    };
}
exports.createRouterDecorator = createRouterDecorator;
exports.Get = createRouterDecorator('get');
function Param(propName) {
    return (target, prpertyKey) => {
        const routes = Reflect.getMetadata('routes', target);
        console.log('GetX', routes);
        console.log(target, prpertyKey, propName);
    };
}
exports.Param = Param;
//# sourceMappingURL=decors.js.map