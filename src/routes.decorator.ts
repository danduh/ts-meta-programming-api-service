import { Router } from 'express';
export const appRouter = Router();
interface IOptions {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares?: any[];
}

function RoutesDecorator(options: IOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[options.method](options.path, target[propertyKey]);
  };
}
export default RoutesDecorator;
