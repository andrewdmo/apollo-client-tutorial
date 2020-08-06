import React from 'react';
import styled from 'react-emotion';
import {gql, useApolloClient} from '@apollo/client';

import {menuItemClassName} from '../components/menu-item';
import {ReactComponent as ExitIcon} from '../assets/icons/exit.svg';


export default function LogoutButton() {
    const client = useApolloClient();
    return (
        <StyledButton
            onClick={() => {
                client.writeQuery({  // replaces writeData
                    query: gql`
                         query isLoggedIn {
                         isLoggedIn
             }`,
                    data: {isLoggedIn: false}
                });
                localStorage.clear();
            }}

        >
            <ExitIcon/>
            Logout
        </StyledButton>
    );
}

const StyledButton = styled('button')(menuItemClassName, {
    background: 'none',
    border: 'none',
    padding: 0,
});
