import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
type GraphQLConfig = {
    appId: string;
    getAppAuthInfo: () => Promise<{
        access_token: string;
    }>;
};
export type GraphQLAccessors = {
    [Property: string]: () => Promise<ApolloClient<NormalizedCacheObject>>;
};
export declare function constructGraphqlClients(clientConfigs: GraphQLConfig[]): GraphQLAccessors;
export {};
//# sourceMappingURL=graphql.d.ts.map