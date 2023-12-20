export function makeGraphQLInputCompatible(obj: any) {
  const json = JSON.stringify(obj);
  return json.replace(/"([^"]+)":/g, "$1:");
}
