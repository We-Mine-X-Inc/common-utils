import { Environment } from "wemine-apis";

export enum OperationType {
  UNKNOWN = 0,
  FETCH = 1,
  UPDATE = 2,
  INSERT = 3,
  DELETE = 4,
}

type SchemaOptions = {
  operationType: OperationType;
  forManyDocuments?: boolean;
  embeddedInFunction?: boolean;
};

export function getHostingContractGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "hostingcontract",
    env,
    schemaOptions,
  });
}

export function getCustomerGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "customer",
    env,
    schemaOptions,
  });
}

export function getDashboardCustomerGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "dashboardcustomer",
    env,
    schemaOptions,
  });
}

export function getHostedMinerGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "hostedminer",
    env,
    schemaOptions,
  });
}

export function getPoolGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({ tableName: "pool", env, schemaOptions });
}

export function getMiningWorkGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "miningwork",
    env,
    schemaOptions,
  });
}

export function getMinerErrorGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "minererror",
    env,
    schemaOptions,
  });
}

export function getFacilityInfoGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "facilityinfo",
    env,
    schemaOptions,
  });
}

export function getFacilityMaintenanceJobGraphSchemaName(
  env: Environment,
  schemaOptions?: SchemaOptions
) {
  return getTableGraphSchemaName({
    tableName: "facilitymaintenancejob",
    env,
    schemaOptions,
  });
}

function getTableGraphSchemaName({
  tableName: tablePrefix,
  env,
  schemaOptions,
}: {
  tableName: string;
  env: Environment;
  schemaOptions?: SchemaOptions | undefined;
}) {
  const commandName = schemaOptions ? getCommandName(schemaOptions) : "";
  const modelName = schemaOptions?.embeddedInFunction
    ? tablePrefix.charAt(0).toUpperCase() + tablePrefix.slice(1)
    : tablePrefix;
  const suffix = schemaOptions?.forManyDocuments ? "s" : "";
  switch (env) {
    case Environment.TEST:
      return `${commandName}${modelName}Test${suffix}`;
    case Environment.DEV:
      return `${commandName}${modelName}Dev${suffix}`;
    case Environment.PROD:
      return `${commandName}${modelName}Prod${suffix}`;
    default:
      return `${commandName}${modelName}Dev${suffix}`;
  }
}

function getCommandName(schemaOptions: SchemaOptions) {
  switch (schemaOptions.operationType) {
    case OperationType.FETCH:
      return "";
    case OperationType.INSERT:
      return schemaOptions.forManyDocuments ? "insertMany" : "insertOne";
    case OperationType.UPDATE:
      return schemaOptions.forManyDocuments ? "updateMany" : "updateOne";
    case OperationType.DELETE:
      return schemaOptions.forManyDocuments ? "deleteMany" : "deleteOne";
    default:
      return "";
  }
}
