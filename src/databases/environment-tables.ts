import { Environment } from "wemine-apis";

getContractGraphSchemaName;

export function getContractGraphSchemaName(env: Environment) {
  return getTableGraphSchemaName({ tablePrefix: "contract", env });
}

export function getCustomerGraphSchemaName(env: Environment) {
  return getTableGraphSchemaName({ tablePrefix: "customer", env });
}

export function getMinerGraphSchemaName(env: Environment) {
  return getTableGraphSchemaName({ tablePrefix: "miner", env });
}

export function getPoolGraphSchemaName(env: Environment) {
  return getTableGraphSchemaName({ tablePrefix: "pool", env });
}

function getTableGraphSchemaName({
  tablePrefix,
  env,
}: {
  tablePrefix: string;
  env: Environment;
}) {
  switch (env) {
    case Environment.TEST:
      return `${tablePrefix}Test`;
    case Environment.DEV:
      return `${tablePrefix}Dev`;
    case Environment.PROD:
      return `${tablePrefix}Prod`;
    default:
      return `${tablePrefix}Dev`;
  }
}
