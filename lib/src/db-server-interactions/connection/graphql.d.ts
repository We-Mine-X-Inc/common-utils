import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
type GraphQLConfig = {
    appId: string;
    getAppAuthInfo: () => Promise<{
        access_token: string;
    }>;
};
export declare function constructGraphqlClients(clientConfigs: GraphQLConfig[]): {
    [Property: string]: () => Promise<ApolloClient<NormalizedCacheObject>>;
};
export {};
//# sourceMappingURL=graphql.d.ts.map