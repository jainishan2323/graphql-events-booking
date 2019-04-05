import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { Loader } from '../styles';

const getEventsQuery = gql`
    {
        events {
            name
            banner_url
        }
    }
`;

class EventsList extends Component {
    public render() {
        return (
            <section>
                <h1>Hello</h1>
                <Loader />
            </section>
        )
    }
}

export default graphql(getEventsQuery)(EventsList);