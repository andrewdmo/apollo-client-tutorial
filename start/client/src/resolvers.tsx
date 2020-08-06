import {gql, ApolloCache, Resolvers} from '@apollo/client';
import * as GetCartItemTypes from './pages/__generated__/GetCartItems';
import * as LaunchTileTypes from './pages/__generated__/LaunchTile';
import {GET_CART_ITEMS} from './pages/cart';

//  client schema: extend typed from server:
export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        cartItems: [ID!]!
    }

    #    creates new field from original on server:
    extend type Launch {
        isInCart: Boolean!
    }

    extend type Mutation {
        addOrRemoveFromCart(id: ID!): [ID!]!
    }
`;

type ResolverFn = (
    parent: any,
    args: any,
    {cache}: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
    [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
    Launch: ResolverMap
    Mutation: ResolverMap;
}

// client resolvers, APIs must match with server:
export const resolvers: AppResolvers = {

    Mutation: {
        addOrRemoveFromCart: (_, {id}: { id: string }, {cache}): string[] => {
            const queryResult = cache
                .readQuery<GetCartItemTypes.GetCartItems, any>({
                    query: GET_CART_ITEMS
                });     // destructure cache from context to get query
            if (queryResult) {
                const {cartItems} = queryResult;
                const data = {
                    cartItems: cartItems.includes(id)
                        ? cartItems.filter((i) => i !== id)
                        : [...cartItems, id],
                };
                cache.writeQuery({    // add or remove items based on mutation list
                    query: GET_CART_ITEMS, data
                });
                return data.cartItems;  // updated list
            }
            return [];
        },
    },

    Launch: {
        isInCart: (launch: LaunchTileTypes.LaunchTile, _, {cache}): boolean => {
            const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({
                query: GET_CART_ITEMS
            });
            if (queryResult) {
                return queryResult.cartItems.includes(launch.id)
            }
            return false;
        }
    },
};

// creates virtual field (on local from server):
export const schema = gql`
    extend type Launch {
        isInCart: Boolean!
    }
`;
