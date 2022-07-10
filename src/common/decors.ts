import 'reflect-metadata';
import { Request, Response } from 'express-serve-static-core';

export type Method = 'get' | 'post';

export interface Route {
  propertyKey: string;
  httpMethod: Method;
  path: string;
}

export function Controller(path: string = ''): ClassDecorator {
  return (target: any) => {
    console.log('Controller', target);
    Reflect.defineMetadata('basePath', path, target);
  };
}

export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

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

      // SKIP
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
        paramsToInject.forEach((param) => {
          argumentsToInject[param.index] = request.params[param.paramName];
        });
        const result = ordinalMethod.apply(this, argumentsToInject); // @Param
        response.send(result);
      };
    };
}

// Route decorator factory for method GET
export const Get: RouterDecoratorFactory = createRouterDecorator('get');
export const Post: RouterDecoratorFactory = createRouterDecorator('post');

interface ParamType {
  index: number; // Argument's index the param should be injected
  paramName: string; // Param name to lookup in Request Object
}

type ParamRecord = Record<string, ParamType[]>;

export function Param(paramName: string): any {
  return (target: Object, methodName: string, index: number) => {
    const param: ParamType = {
      paramName,
      index,
    };

    if (!Reflect.hasMetadata('routeParams', target)) {
      Reflect.defineMetadata('routeParams', {}, target);
    }
    const routeParams: ParamRecord = Reflect.getMetadata('routeParams', target);
    if (!routeParams.hasOwnProperty(methodName)) routeParams[methodName] = [];
    // Class Method Name, where param should be injected in
    routeParams[methodName].push(param);
  };
}
