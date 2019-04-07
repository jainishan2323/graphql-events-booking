import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, Query } from "react-apollo";

import { Container, DescriptionContainer } from './styles';
import { Loader, Button } from '../styles';

const CREATE_RESERVATION = gql`
    mutation createReservation($input: ReservationInput) {
        createReservation(input: $input) {
            id
        }
    }
`;

const GET_RESERVATION = gql`
    query reservation($reservation_id: ID!) {
        reservation(reservation_id: $reservation_id) {
            id
            event_id
            reserved_tickets {
                ticket_type
                ticket_count
            }
        }
    }
`;

const CANCEL_RESERVATION = gql`
    mutation cancelReservation($reservation_id: ID!) {
        cancelReservation(reservation_id: $reservation_id) {
            id
        }
    }
`;

class EventContainer extends React.PureComponent<any, any> {
    public state = {
        reserved_tickets: {},
        reservation_id: '',
        showCheckout: false,
    }
    
    public handleOptionChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const ticket_type = (e.target as HTMLSelectElement).name;
        const ticket_count = (e.target as HTMLSelectElement).value;

        this.setState((prevState) => ({
            reserved_tickets: {
                ...prevState.reserved_tickets,
                [ticket_type]: ticket_count,
            }
        }));
    }

    public handleCheckout = (createReservation) => {
        const { id } = this.props.event;
        const { reserved_tickets } = this.state;
        const reserved_tickets_response = this.parseTicketsToArray(reserved_tickets);
        const payload = {
            event_id: id,
            reserved_tickets: reserved_tickets_response,
        }
        createReservation({ variables: {input: payload}});
    }

    public parseTicketsToArray = (tickets: {[k: string]: string}) => {
        return Object.keys(tickets).map((ticket) => (
            {ticket_type: ticket, ticket_count: parseInt(tickets[ticket])})
        )
    }

    public renderTicketList = () => {
        if (Array.isArray(this.props.event.ticket_types)) {
            return this.props.event.ticket_types.map((ticket) => (
                <div key={ticket.id} className='ticket-list'>
                    <div>
                        <h5>{ticket.name}</h5>
                        <p>{ticket.quantity_available}</p>
                    </div>
                    {
                        ticket.quantity_available ? <div><select name={ticket.name} onChange={this.handleOptionChange}>
                            {
                                [0,1,2,3,4,5].map((val) => (
                                    <option
                                        value={val}
                                        key={val}
                                    >
                                        {val}
                                    </option>
                                ))
                            }
                        </select></div> : <h5 className='tertiary'>Unavailable</h5>
                    }
                </div>
            ))
        }
        return null;
    }

    public handleReservationComplete = (data) => {
        this.setState({
            reservation_id: data.createReservation.id,
            showCheckout: true,
        })
    }

    public handleReservationCancel = (data) => {
        this.setState({
            reservation_id: '',
            showCheckout: false,
        })
    }

    public render() {
        const {
            event
        } = this.props;
        const {
            showCheckout,
            reservation_id,
        } = this.state;
        const buttonState = Object.keys(this.state.reserved_tickets).length > 0;
        return (
            <Container>
                <div className='img-container'>
                    <img src={event.banner_url} alt='bg image'/>
                </div>
                {
                    (showCheckout && reservation_id) ? (
                        <Query query={GET_RESERVATION} variables={{ reservation_id: reservation_id}}>
                            {
                                (props) => {
                                    if (props.data && props.data.loading) {
                                        return <Loader />
                                    }
                                    if (props.data && props.data.reservation) {
                                        return (
                                            <section>
                                                <Mutation
                                                    mutation={CANCEL_RESERVATION}
                                                    onCompleted={(data) => this.handleReservationCancel(data)}
                                                >
                                                    {
                                                        (cancelReservation, {loading, error, data}) => (
                                                            <>
                                                            <Button
                                                                onClick={(e) => {
                                                                Promise.resolve().then(
                                                                    () => cancelReservation({ variables: {reservation_id: props.data.reservation.id}})
                                                                )
                                                            }}>
                                                                Cancel
                                                            </Button>
                                                            {
                                                                (data && data.createReservation) && <p>{data.createReservation.id}</p>
                                                            }
                                                            </>
                                                        )
                                                    }
                                                </Mutation>
                                                <h3>{props.data.reservation.id}</h3>
                                            </section>
                                        )
                                    }
                                    return null;
                                }
                            }
                        </Query>
                    ) : (<DescriptionContainer>
                        <div className='description'>
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>
                                <span>{event.date}</span>
                                <span>{event.location}</span>
                            </p>
                        </div>
                        <div>
                            <h4>
                                Tickets
                            </h4>
                            <div className='ticket-container'>
                                {
                                    this.renderTicketList()
                                }
                                <Mutation
                                    mutation={CREATE_RESERVATION}
                                    onCompleted={(data) => this.handleReservationComplete(data)}
                                >
                                    {
                                        (createReservation, {loading, error, data}) => (
                                            <>
                                            <Button
                                                disabled={!buttonState}
                                                onClick={(e) => {
                                                Promise.resolve().then(
                                                    () => this.handleCheckout(createReservation)
                                                )
                                            }}>
                                                Checkout
                                            </Button>
                                            {
                                                (data && data.createReservation) && <p>{data.createReservation.id}</p>
                                            }
                                            </>
                                        )
                                    }
                                </Mutation>
                            </div>
                        </div>
                    </DescriptionContainer>)
                }
            </Container>
        )
    }
}

export default EventContainer;
