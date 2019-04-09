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

interface IEventType {
    id: string;
    name: string;
    url: string;
    banner_url: string;
    date: string;
    location: string;
    description: string;
    ticket_types: ITicketType[];
}

interface ITicketType {
    id: string;
    name: string;
    quantity_available: number | null;
}
class EventDetails extends React.PureComponent<any> {
    public eventId: string;
    constructor(props) {
        super(props);
        const eventsList: {events: IEventType[]} = JSON.parse(window.localStorage.getItem('events'));
        this.eventId = this.getEventDetails(eventsList.events);
    }

    public getEventDetails = (data: IEventType[]) => {
        const eventurl = window.location.pathname.split('/').pop();
        const event: IEventType = data.find((ev) => ev.url === `/${eventurl}`);

        return event.id;
    }
    public render() {
        return (
            <Query
                query={GET_EVENT_DETAILS}
                variables={{ id: this.eventId}}
            >
                {
                    (props) => {
                        if (props.data && props.data.loading) {
                            return <Loader />
                        }
                        if (props.data && props.data.event) {
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