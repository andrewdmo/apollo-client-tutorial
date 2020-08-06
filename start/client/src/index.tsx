import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, HttpLink, useQuery} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
import gql from 'graphql-tag';
import {resolvers, typeDefs} from './resolvers';
import Login from "./pages/login";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/',  //match in server (RUN!)
    headers: {authorization: localStorage.getItem('token'),},   // reads token from localStorage then attached every GQL request header
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link,
    typeDefs,
    resolvers,
});

// create query:
const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }`;

// renders login or homepage component, also cache reads are sync:
function IsLoggedIn() {
    const {data} = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <Pages/> : <Login/>;
}


//  replaces writeData:
client.writeQuery({
    query: gql`
        query SaveLoggedIn {
            isLoggedIn
        }
    `,
    data: {
        isLoggedIn: !!localStorage.getItem('token'),  // 'direct write' to Ap cache
        cartItems: []
    }
})

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>
        <Pages/>
    </ApolloProvider>,
    document.getElementById('root')
);
// instantiation of the client object (above)


client
.query({
    query: gql`
        query GetLaunch {
            launch(id: 56) {
                id
                mission {
                    name
                }
            }
        }
    `
})
.then(result => console.log(result));

