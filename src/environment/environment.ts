import { Environment } from "wemine-apis";

type EnvironmentString = "test" | "development" | "production";
export function convertStringToEnum(envString: EnvironmentString) {
  switch (envString) {
    case "test":
      return Environment.TEST;
    case "development":
      return Environment.DEV;
    case "production":
      return Environment.PROD;
    default:
      return Environment.UNKNOWN_ENVIRONMENT;
  }
}
