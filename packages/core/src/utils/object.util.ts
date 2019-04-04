import { forOwn, isArray, isFunction, isObject } from 'lodash';
import { DeepReadonly } from './types.util';

export const removeUndefinedProps = (object: any) => {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === undefined) {
      delete object[key];
    }
  }
  return object;
};

export const removeEqualProps = (object: any, defaultObject: any) => {
  for (const key in object) {
    if (object[key] === defaultObject[key]) {
      delete object[key];
    }
  }
  return object;
};

export const deepFreeze = <T>(object: T): DeepReadonly<T> => {
  if (isObject(object) || isArray(object) || isFunction(object)) {
    Object.freeze(object);
    forOwn(object, deepFreeze);
  }
  return object as DeepReadonly<T>;
};
