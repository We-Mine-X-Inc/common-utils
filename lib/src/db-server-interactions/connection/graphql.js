"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGraphqlClients = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@apollo/client");
function constructGraphqlClients(clientConfigs) {
    const graphQLClients = {};
    clientConfigs.forEach(({ appId, getAppAuthInfo }) => {
        graphQLClients[appId] = () => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield getGraphQLClient({ appId, getAppAuthInfo }); });
    });
    return graphQLClients;
}
exports.constructGraphqlClients = constructGraphqlClients;
function getGraphQLClient(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const accessToken = (yield config.getAppAuthInfo()).access_token;
        return new client_1.ApolloClient({
            cache: new client_1.InMemoryCache(),
            link: (0, client_1.from)([
                generateAuthMiddleware(accessToken),
                getHttpLink(config.appId),
            ]),
        });
    });
}
function getHttpLink(appId) {
    return new client_1.HttpLink({
        uri: `https://realm.mongodb.com/api/client/v2.0/app/${appId}/graphql`,
    });
}
function generateAuthMiddleware(accessToken) {
    return new client_1.ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => ({
            headers: Object.assign(Object.assign({}, headers), { authorization: `Bearer ${accessToken}` }),
        }));
        return forward(operation);
    });
}
//# sourceMappingURL=graphql.js.map