import React, {Fragment} from 'react';
import {RouteComponentProps} from '@reach/router';
import {gql, useQuery} from '@apollo/client'

import {LaunchTile, Header, Button, Loading} from '../components';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';

export const LAUNCH_TILE_DATA = gql`
    fragment LaunchTile on Launch {
        id
        isBooked
        rocket {
            id
            name
        }
        mission {
            name
            missionPatch
        }
    }
`;

// query that fetches list of launches:
const GET_LAUNCHES = gql`
    query launchList($after: String) {
        launches(after: $after) {
            cursor
            hasMore
            launches {
                id
                isBooked
                rocket {
                    id
                    name
                }
                LaunchTile
                mission {
                    name
                    missionPatch
                }
            }
        }
    }
    ${LAUNCH_TILE_DATA}
`;

interface LaunchesProps extends RouteComponentProps {
}

const Launches: React.FC<LaunchesProps> = () => {   // 'Functional Component'
    const {
        data,
        loading,
        error,
        fetchMore   //pagination
    } = useQuery<GetLaunchListTypes.GetLaunchList,      // pass query to React hook
        GetLaunchListTypes.GetLaunchListVariables>(GET_LAUNCHES);

    if (loading) return <Loading/>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <Fragment>
            <Header/>
            {data.launches &&
            data.launches.launches &&
            data.launches.launches.map((launch: any) => (
                <LaunchTile key={launch.id} launch={launch}/>
            ))}
            {data.launches &&
            data.launches.hasMore && (
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                after: data.launches.cursor,
                            },

                            //check if more results:
                            updateQuery: (prev, {fetchMoreResult, ...rest}) => {
                                if (!fetchMoreResult) return prev;
                                return {
                                    ...fetchMoreResult,
                                    launches: {
                                        ...fetchMoreResult.launches,
                                        launches: [
                                            ...prev.launches.launches,
                                            ...fetchMoreResult.launches.launches,
                                        ],
                                    },
                                };
                            },
                        })
                    }
                >
                    Load More
                </Button>
            )
            }
        </Fragment>
    );  // Launches
}


export default Launches;
