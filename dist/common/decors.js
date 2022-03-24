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
        const routeParams = Reflect.getMetadata('routeParams', target);
        let paramToInject;
        if (routeParams) {
            console.log(routeParams[propertyKey]);
            paramToInject = routeParams[propertyKey];
        }
        const ordinalMethod = descriptor.value;
        descriptor.value = (...args) => {
            let [request, response] = args;
            console.log(request.params[paramToInject]);
            const result = ordinalMethod.apply(this, [request.params[paramToInject]]);
            console.log(result);
            response.send(result);
        };
    };
}
exports.createRouterDecorator = createRouterDecorator;
exports.Get = createRouterDecorator('get');
function Param(paramName) {
    return (target, propertyKey, index) => {
        if (!Reflect.hasMetadata('routeParams', target)) {
            Reflect.defineMetadata('routeParams', {}, target);
        }
        const routeParams = Reflect.getMetadata('routeParams', target);
        routeParams[propertyKey] = paramName;
    };
}
exports.Param = Param;
//# sourceMappingURL=decors.js.map