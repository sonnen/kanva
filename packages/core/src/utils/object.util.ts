export const removeUndefinedProps = (object: any) => {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === undefined) {
      delete object[key];
    }
  }
  return object;
};
