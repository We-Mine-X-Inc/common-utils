export function removeKeys(
  obj: any,
  keys: string[]
): (obj: any, keys: string[]) => any {
  return (obj: any, keys: string[]) =>
    obj !== Object(obj)
      ? obj
      : Array.isArray(obj)
      ? obj.map((item) => removeKeys(item, keys))
      : Object.keys(obj)
          .filter((k) => !keys.includes(k))
          .reduce(
            (acc, x) => Object.assign(acc, { [x]: removeKeys(obj[x], keys) }),
            {}
          );
}

export function removeNestedNullUndefined(obj: any) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeNestedNullUndefined(obj[key]);
    }
  }
}
