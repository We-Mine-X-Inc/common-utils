import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from "@apollo/client";

type GraphQLConfig = {
  appId: string;
  getAppAuthInfo: () => Promise<{ access_token: string }>;
};

export type GraphQLAccessors = {
  [Property: string]: () => Promise<ApolloClient<NormalizedCacheObject>>;
};

export function constructGraphqlClients(clientConfigs: GraphQLConfig[]) {
  const graphQLClients: GraphQLAccessors = {};

  clientConfigs.forEach(({ appId, getAppAuthInfo }) => {
    graphQLClients[appId] = async () =>
      await getGraphQLClient({ appId, getAppAuthInfo });
  });
  return graphQLClients;
}

async function getGraphQLClient(config: GraphQLConfig) {
  const accessToken = (await config.getAppAuthInfo()).access_token;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      generateAuthMiddleware(accessToken),
      getHttpLink(config.appId),
    ]),
  });
}

function getHttpLink(appId: string) {
  return new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${appId}/graphql`,
  });
}

function generateAuthMiddleware(accessToken: String) {
  return new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    }));

    return forward(operation);
  });
}
