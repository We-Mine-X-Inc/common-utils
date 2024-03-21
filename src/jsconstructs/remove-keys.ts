export function removeKeys(obj: any, keys: string[]): any {
  const objCopy = { ...obj };
  function innerRemoveKeys(obj: any, keys: string[]): any {
    return obj !== Object(obj)
      ? obj
      : Array.isArray(obj)
      ? obj.map((item) => innerRemoveKeys(item, keys))
      : Object.keys(obj)
          .filter((k) => !keys.includes(k))
          .reduce(
            (acc, x) =>
              Object.assign(acc, { [x]: innerRemoveKeys(obj[x], keys) }),
            {}
          );
  }
  return innerRemoveKeys(objCopy, keys);
}

export function removeNestedNullUndefined(obj: any) {
  const objCopy = { ...obj };
  function innerRemoveNestedNullUnfedined(obj: any) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        removeNestedNullUndefined(obj[key]);
      }
    }
  }
  innerRemoveNestedNullUnfedined(objCopy);
  return objCopy;
}
