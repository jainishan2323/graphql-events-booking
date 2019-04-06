import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import EventsCard from './EventCard';

import { Loader } from '../styles';

const getEventsQuery = gql`
    {
        events {
            id
            name
            banner_url
            description
        }
    }
`;

class EventsList extends Component<any> {
    public renderEventList = () => {
        return this.props.data.events.map(
                (event) => <EventsCard {...event} key={event.id} />
        )
    }
    public render() {
        console.log(this.props.data);
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }

        if (this.props.data.error) {
            return (
                <h3>Oops something went wrong!</h3>
            )
        }
        return (
            <section>
                { this.renderEventList() }
            </section>
        )
    }
}

export default graphql(getEventsQuery)(EventsList);