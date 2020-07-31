import React, { Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Loading, Header, LaunchTile } from '../components';
import { LAUNCH_TILE_DATA } from './launches';
import * as GetMyTripsTypes from './__generated__/GetMyTrips';


interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  return <div />;
}

export default Profile;


export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;
