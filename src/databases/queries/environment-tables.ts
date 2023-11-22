import { Environment } from "wemine-apis";

export function getCustomerGraphSchemaName(env: Environment) {
  switch (env) {
    case Environment.TEST:
      return "customerTest";
    case Environment.DEV:
      return "customerDev";
    case Environment.PROD:
      return "customerProd";
    default:
      return "customerDev";
  }
}

export function getMinerGraphSchemaName(env: Environment) {
  switch (env) {
    case Environment.TEST:
      return "minerTest";
    case Environment.DEV:
      return "minerDev";
    case Environment.PROD:
      return "minerProd";
    default:
      return "minerDev";
  }
}
