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
