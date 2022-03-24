import 'reflect-metadata';
import { Route } from './decors';
import * as path from 'path';
import { Application } from "express-serve-static-core";

export function controllersHandler(controllers: any[], app: Application) {
  console.log('controllersHandler', controllers);
  for (const controller of controllers) {
    const isController: boolean = Reflect.hasMetadata('basePath', controller);
    const hasRoutes: boolean = Reflect.hasMetadata(
      'routes',
      controller.prototype
    );

    if (isController && hasRoutes) {
      const basePath: string = Reflect.getMetadata('basePath', controller);
      const routes: Route[] = Reflect.getMetadata(
        'routes',
        controller.prototype
      );
      let curPath: string, curRouteHandler;
      routes.forEach((route: Route) => {
        curPath = path.posix.join('/', basePath, route.path);
        curRouteHandler = controller.prototype[route.propertyKey];
        app[route.method](curPath, curRouteHandler);
        console.info(
          `router: ${controller.name}.${route.propertyKey} [${route.method}] ${curPath}`
        );
      });
    }
  }
}
