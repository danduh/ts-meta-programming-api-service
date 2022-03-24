import 'reflect-metadata';

export interface Route {
  propertyKey: string;
  method: string;
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
 * @param {string} method routing method('get', 'post' etc.)
 * @return {RouterDecoratorFactory} route decorator factory
 */
export function createRouterDecorator(method: string): RouterDecoratorFactory {
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

      // LAST
      const ordinalMethod = descriptor.value;
      descriptor.value = (...args) => {
        let [request, response] = args;
        const result = ordinalMethod.apply(this, args);
        console.log(result);
        response.send(result);
      };
    };
}

// Route decorator factory for method GET
export const Get: RouterDecoratorFactory = createRouterDecorator('get');

// export const GetX = (path: string): MethodDecorator => {
//     const method = 'get';
//     return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//         console.log(method, target, propertyKey)
//         const route: Route = {
//             propertyKey,
//             method,
//             path: path || ''
//         };
//
//         if (!Reflect.hasMetadata('routes', target)) {
//             Reflect.defineMetadata('routes', [], target);
//         }
//
//         const routes = Reflect.getMetadata('routes', target);
//         console.log('GetX', target)
//         routes.push(route);
//     }
// }

export function Param(propName: string) {
  return (target: Object, prpertyKey: string) => {
    const routes = Reflect.getMetadata('routes', target);
    console.log('GetX', routes);

    console.log(target, prpertyKey, propName);
    return 4;
  };
}
