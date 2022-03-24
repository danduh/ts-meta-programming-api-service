import 'reflect-metadata';
import { Request, Response } from "express-serve-static-core";

export type Method = 'get' | 'post'

export interface Route {
    propertyKey: string;
    method: Method;
    path: string;
}

export function Controller(path: string = ''): ClassDecorator{
    return (target: any) => {
        console.log('Controller', target);
        Reflect.defineMetadata('basePath', path, target);
    };
}

export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

/**
 * Create a route decorator factory
 * @param {string} method routing method('get', 'post' etc.)
 * @return {RouterDecoratorFactory} route decorator factory
 */
export function createRouterDecorator(method: Method): RouterDecoratorFactory{
    return (path?: string) =>
        (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
            const route: Route = {
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
            let paramToInject: string;
            if(routeParams) {
                paramToInject = routeParams[propertyKey];
            }

            // LAST
            const ordinalMethod = descriptor.value;
            descriptor.value = (...args: [ Request, Response ]) => {
                let [ request, response ] = args;
                const result = ordinalMethod.apply(this, [request.params[paramToInject]]); // @Param
                response.send(result);
            };
        };
}

// Route decorator factory for method GET
export const Get: RouterDecoratorFactory = createRouterDecorator('get');






export function Param(paramName: string): any{
    return (target: Object, propertyKey: string, index: number) => {
        console.log('IN PARAM', propertyKey)
        if (!Reflect.hasMetadata('routeParams', target)) {
            Reflect.defineMetadata('routeParams', {}, target);
        }
        const routeParams = Reflect.getMetadata('routeParams', target);
        routeParams[propertyKey] = paramName
    };
}
