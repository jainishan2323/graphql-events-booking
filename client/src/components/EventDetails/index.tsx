import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import EventContainer from './EventContainer';

import { Loader } from '../styles';

const GET_EVENT_DETAILS = gql`
    query($id: ID!){
        event(event_id: $id) {
            id
            name
            banner_url
            date
            location
            description
            url
            ticket_types {
                id
                name
                quantity_available
            }
        }
    }
`;

class EventDetails extends React.PureComponent<any> {
    public render() {
        return (
            <Query
                query={GET_EVENT_DETAILS}
                variables={{ id: "5ca632f455a63b730bcf51db"}}
            >
                {
                    (props) => {
                        if (props.data && props.data.loading) {
                            return <Loader />
                        }
                        if (props.data.event) {
                            return (
                                <EventContainer
                                    event={...props.data.event}
                                />
                            )
                        }
                        return null;
                    }
                }
            </Query>
        )
    }
}

export default EventDetails;