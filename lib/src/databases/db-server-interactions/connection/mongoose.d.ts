import { Connection } from "mongoose";
export type DatabaseConfigurations = {
    [Property: string]: () => Connection;
};
export declare function buildConnections({ defaultDatabaseUrl, databaseNames, }: {
    defaultDatabaseUrl: string;
    databaseNames: string[];
}): DatabaseConfigurations;
//# sourceMappingURL=mongoose.d.ts.map