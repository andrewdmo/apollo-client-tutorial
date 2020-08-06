import {ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, HttpLink} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
import gql from 'graphql-tag';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/'  //set in server (RUN!)
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});


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

