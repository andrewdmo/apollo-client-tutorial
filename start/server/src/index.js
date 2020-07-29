require('dotenv').config();

const {ApolloServer} = require('apollo-server');
const {createStore} = require('./utils');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const isEmail = require('isemail');
const store = createStore(); //sets up SQLite DB

const server = new ApolloServer({
    typeDefs,
    resolvers, //knows how to call resolver functions as needed to fulfill incoming queries
    dataSources: () => ({launchAPI: new LaunchAPI(), userAPI: new UserAPI({store})}),
    context: async ({req}) => {     //called every GraphQL operation clients => server, return value is context arg for resolvers
        const auth = req.headers && req.headers.authorization || '';        // simple auth check on every request
        const email = Buffer.from(auth, 'base64').toString('ascii');
        if (!isEmail.validate(email)) return {user: null};              // find a user by their email
        const users = await store.users.findOrCreate({where: {email}});
        const user = users && users[0] || null;
        return {user: {...user.dataValues}};    //user details available
    }
    // Additional constructor options
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});
