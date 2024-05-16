export function jsonSafeParse(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return {};
  }
}
