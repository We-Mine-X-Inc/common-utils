import { Environment } from "wemine-apis";
export declare enum OperationType {
    UNKNOWN = 0,
    FETCH = 1,
    UPDATE = 2,
    INSERT = 3,
    DELETE = 4
}
type SchemaOptions = {
    operationType: OperationType;
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