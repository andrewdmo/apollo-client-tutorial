import React from 'react';
import {ApolloClient, useApolloClient, useMutation} from '@apollo/client';
import gql from 'graphql-tag';

import {LoginForm, Loading} from '../components';
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
    mutation login($email: String!) {
        login(email: $email)
    }
`;
