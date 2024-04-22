import { Environment } from "wemine-apis";
type SchemaOptions = {
    forManyDocuments?: boolean;
    embeddedInFunction?: boolean;
};
export declare function getHostingContractGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getCustomerGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getHostedMinerGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getPoolGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getMiningWorkGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getMinerErrorGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getFacilityInfoGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export declare function getFacilityMaintenanceJobGraphSchemaName(env: Environment, schemaOptions?: SchemaOptions): string;
export {};
//# sourceMappingURL=environment-tables.d.ts.map