import { ParamRecord, ParamType } from './types';

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
