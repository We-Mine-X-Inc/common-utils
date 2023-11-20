import { Connection } from "mongoose";
type DatabaseConfigurations = {
    [Property: string]: () => Connection;
};
export declare function buildConnections({ defaultDatabaseUrl, databaseNames, }: {
    defaultDatabaseUrl: string;
    databaseNames: string[];
}): DatabaseConfigurations;
export {};
//# sourceMappingURL=mongoose.d.ts.map