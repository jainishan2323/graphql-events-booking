import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, Query } from 'react-apollo';

import EventsCard from './EventCard';

import { Loader } from '../styles';
import { Container } from './styles';

const getEventsQuery = gql`
    {
        events {
            id
            name
            banner_url
            description
            url
        }
    }
`;

const GET_EVENTS_LIST = gql`
    {
        events {
            id
            name
            banner_url
            description
            url
        }
    }
`;

class EventsList extends Component<any> {
    public render() {
        return (
            <Query
                query={GET_EVENTS_LIST}
                onCompleted={(data) => window.localStorage.setItem('events', JSON.stringify(data))}
            >
            {
                (props) => {
                    if (props.data && props.data.loading) {
                        return <Loader />
                    }
                    if (props.data && props.data.error) {
                        return <h3>Oops something went wrong!</h3>
                    }
                    if (props.data && Array.isArray(props.data.events)) {
                        return (
                            <Container>
                                <h2>Select events</h2>
                                {
                                    props.data.events.map(
                                        (event) => <EventsCard {...event} key={event.id} />
                                        )
                                }
                            </Container>
                        )
                    }
                    return null;
                }
            }
            </Query>
        )
    }
}

export default EventsList;