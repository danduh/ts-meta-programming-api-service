import 'reflect-metadata';
import { Request, Response } from 'express-serve-static-core';
import {
  Method,
  ParamRecord,
  ParamType,
  Route,
  RouterDecoratorFactory,
} from './types';

/**
 * Create a route decorator factory
 * @param {string} httpMethod routing method('get', 'post' etc.)
 * @return {RouterDecoratorFactory} route decorator factory
 */
export function createRouterDecorator(
  httpMethod: Method
): RouterDecoratorFactory {
  return (path?: string) =>
    (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const route: Route = {
        propertyKey,
        httpMethod,
        path: path || '',
      };

      if (!Reflect.hasMetadata('routes', target)) {
        Reflect.defineMetadata('routes', [], target);
      }

      const routes = Reflect.getMetadata('routes', target);
      routes.push(route);

      // @Params
      const routeParams: ParamRecord = Reflect.getMetadata(
        'routeParams',
        target
      );
      let paramsToInject: ParamType[];
      if (routeParams) {
        paramsToInject = routeParams[propertyKey];
      }
      // LAST
      const ordinalMethod = descriptor.value;
      descriptor.value = (...args: [Request, Response]) => {
        let [request, response] = args;
        const argumentsToInject: any[] = [];
        // Params care
        if (paramsToInject?.length > 0) {
          paramsToInject.forEach((param) => {
            argumentsToInject[param.index] = request.params[param.paramName];
          });
        }
        const result = ordinalMethod.apply(this, argumentsToInject); // @Param
        response.send(result);
      };
    };
}

// Route decorator factory for method GET
export const Get: RouterDecoratorFactory = createRouterDecorator('get');
export const Post: RouterDecoratorFactory = createRouterDecorator('post');
