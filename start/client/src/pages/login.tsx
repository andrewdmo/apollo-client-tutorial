import React from 'react';
import {ApolloClient, useApolloClient, useMutation} from '@apollo/client';
import gql from 'graphql-tag';

import {LoginForm, Loading} from '../components';
import * as LoginTypes from './__generated__/login';
import {isLoggedInVar} from "../../../../final/client/src/cache";

export const LOGIN_USER = gql`
    mutation login($email: String!) {
        login(email: $email)
    }
`;

export default function Login() {
    const client: ApolloClient<any> = useApolloClient();    // access Ap client directly instead outside react-hooks helpers
    const [login, {loading, error}] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(    // return mutate function + data object
        LOGIN_USER, {
            onCompleted({login}) {
                localStorage.setItem('token', login as string);     // save login token to localStorage
                client.writeQuery({
                    query: gql`
                        query SaveLoggedIn {
                            isLoggedIn
                        }
                    `,
                    data: {
                        isLoggedIn: true   // 'direct write' to Ap cache
                    }
                })
            }
        });

    if (loading) return <Loading/>;
    if (error) return <p>An error occurred</p>;

    return <LoginForm login={login}/>;  // pass to component
}
