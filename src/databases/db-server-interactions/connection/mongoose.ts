import mongoose, { Connection } from "mongoose";

export type DatabaseConfigurations = {
  [Property: string]: () => Connection;
};

export function buildConnections({
  defaultDatabaseUrl,
  databaseNames,
}: {
  defaultDatabaseUrl: string;
  databaseNames: string[];
}): DatabaseConfigurations {
  mongoose.connect(defaultDatabaseUrl);

  const databaseConigs: DatabaseConfigurations = {};

  databaseNames.forEach((dbName) => {
    databaseConigs[dbName] = () => {
      return mongoose.connection.useDb(dbName);
    };
  });
  return databaseConigs;
}
