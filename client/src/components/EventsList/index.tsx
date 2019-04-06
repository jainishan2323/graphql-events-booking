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
                <h3>Damn it!</h3>
            </section>
        )
    }
}

export default graphql(getEventsQuery)(EventsList);