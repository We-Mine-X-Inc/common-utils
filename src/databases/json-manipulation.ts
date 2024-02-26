export function makeGraphQLInputCompatible(obj: any) {
  const json = JSON.stringify(obj);

  // Extract and remove quotations around field names.
  return json.replace(/"([^"\\]+)":/g, "$1:");
}
