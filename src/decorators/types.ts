export type Method = 'get' | 'post';

export interface Route {
  propertyKey: string;
  httpMethod: Method;
  path: string;
}

export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

export interface ParamType {
  index: number; // Argument's index the param should be injected
  paramName: string; // Param name to lookup in Request Object
}

export type ParamRecord = Record<string, ParamType[]>;
