// "use strict";
//
// import {ApolloClient} from '@apollo/client';
//
//
// var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
//     if (Object.defineProperty) {
//         Object.defineProperty(cooked, "raw", {value: raw});
//     } else {
//         cooked.raw = raw;
//     }
//     return cooked;
// };
// exports.__esModule = true;
//
//
// var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
// var apollo_link_http_1 = require("apollo-link-http");
// var graphql_tag_1 = require("graphql");
//
// var cache = new apollo_cache_inmemory_1.InMemoryCache();
// var link = new apollo_link_http_1.HttpLink({
//     uri: 'http://localhost:4000/' //set in server (make sure running!)
// });
//
// const client = new ApolloClient({
//     cache: cache,
//     link: link
// });
//
// client.query({
//     query: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        query GetLaunch {\n            launch(id: 56) {\n                id\n                mission {\n                    name\n                }\n            }\n        }\n    "], ["\n        query GetLaunch {\n            launch(id: 56) {\n                id\n                mission {\n                    name\n                }\n            }\n        }\n    "])))
// })
//     .then(function (result) {
//         return console.log(result);
//     });
//
// var templateObject_1;
