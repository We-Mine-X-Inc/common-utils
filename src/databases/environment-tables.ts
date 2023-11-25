import { Environment } from "wemine-apis";

type SchemaOptions = {
  forManyDocuments?: boolean;
  embeddedInFunction?: boolean;
};

export function getContractGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tablePrefix: "contract",
    env,
    schemaOptions,
  });
}

export function getCustomerGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tablePrefix: "customer",
    env,
    schemaOptions,
  });
}

export function getMinerGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({ tablePrefix: "miner", env, schemaOptions });
}

export function getPoolGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({ tablePrefix: "pool", env, schemaOptions });
}

export function getMiningWorkGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tablePrefix: "miningwork",
    env,
    schemaOptions,
  });
}

function getTableGraphSchemaName({
  tablePrefix,
  env,
  schemaOptions,
}: {
  tablePrefix: string;
  env: Environment;
  schemaOptions?: SchemaOptions | undefined;
}) {
  const prefix = schemaOptions?.embeddedInFunction
    ? tablePrefix.charAt(0).toUpperCase() + tablePrefix.slice(1)
    : tablePrefix;
  const suffix = schemaOptions?.forManyDocuments ? "s" : "";
  switch (env) {
    case Environment.TEST:
      return `${prefix}Test${suffix}`;
    case Environment.DEV:
      return `${prefix}Dev${suffix}`;
    case Environment.PROD:
      return `${prefix}Prod${suffix}`;
    default:
      return `${prefix}Dev${suffix}`;
  }
}
