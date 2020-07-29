require('dotenv').config();

const {ApolloServer} = require('apollo-server');
const {createStore} = require('./utils');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore(); //sets up SQLite DB

const server = new ApolloServer({
    typeDefs,
    resolvers, //knows how to call resolver functions as needed to fulfill incoming queries
    dataSources: () => ({launchAPI: new LaunchAPI(), userAPI: new UserAPI({store})})
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
