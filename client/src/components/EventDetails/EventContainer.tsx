import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation, Query } from "react-apollo";

import { Container, DescriptionContainer, BookingContainer, FormContainer } from './styles';
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

const CONFIRM_BOKING = gql`
    mutation createBooking($input: BookingInput) {
        createBooking(input: $input) {
            id
        }
    }
`;


class EventContainer extends React.PureComponent<any, any> {
    public state = {
        reserved_tickets: {},
        reservation_id: '',
        showCheckout: false,
        user_details: {},
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
                        ticket.quantity_available || ticket.quantity_available > 0 ?
                            <div><select name={ticket.name} onChange={this.handleOptionChange}>
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
            reserved_tickets: {},
            user_details: {},
        })
    }

    public handleFormInput = (e, type) => {
        const value = e.target && e.target.value || '';
        if (value) {
            this.setState((prevState) => ({
                user_details: {
                    ...prevState.user_details,
                    [type]: value,
                }
            }));
        }
    }

    public handleBooking = (createBooking) => {
        const {user_details, reservation_id} = this.state;
        const payload = {
            reservation_id,
            user_details,
        }
        createBooking({variables: {input: payload}})
    }

    public handleBookingComplete = (data) => {
        this.setState({
            reservation_id: '',
            user_details: {},
            showCheckout: false,
            reserved_tickets: {},
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
                        <BookingContainer>
                            <Query query={GET_RESERVATION} variables={{ reservation_id: reservation_id}}>
                            {
                                (props) => {
                                    if (props.data && props.data.loading) {
                                        return <Loader />
                                    }
                                    if (props.data && props.data.reservation) {
                                        return (
                                            <section>
                                                <div className='breadcrumbs'>
                                                    <div className='title'>
                                                        <h3>{event.name}</h3>
                                                        <h3>></h3>
                                                        <h3 className='tertiary'>Checkout</h3>
                                                    </div>
                                                    <Mutation
                                                        mutation={CANCEL_RESERVATION}
                                                        onCompleted={(data) => this.handleReservationCancel(data)}
                                                    >
                                                        {
                                                            (cancelReservation, {loading, error, data}) => (
                                                                <div>
                                                                <button
                                                                    className='link-button'
                                                                    onClick={(e) => {
                                                                    Promise.resolve().then(
                                                                        () => cancelReservation({ variables: {reservation_id: props.data.reservation.id}})
                                                                    )
                                                                }}>
                                                                    <i className='material-icons'>close</i>
                                                                </button>
                                                                </div>
                                                            )
                                                        }
                                                    </Mutation>
                                                </div>
                                                <Mutation
                                                    mutation={CONFIRM_BOKING}
                                                    onCompleted={(data) => this.handleBookingComplete(data)}
                                                >
                                                    {
                                                        (createBooking, {loading, error, data}) => (
                                                            <FormContainer>
                                                                <h5>Personal Information</h5>
                                                                <form onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                    Promise.resolve().then(
                                                                        () => this.handleBooking(createBooking)
                                                                    )
                                                                }}>
                                                                    <div className='field'>
                                                                        <div>
                                                                            <label htmlFor="first_name">First Name*</label>
                                                                            <input
                                                                                type="text"
                                                                                name="first_name"
                                                                                onChange={(e) => this.handleFormInput(e, 'first_name')}
                                                                                required />
                                                                        </div>
                                                                        <div>
                                                                            <label htmlFor="last_name">Last Name*</label>
                                                                            <input
                                                                                type="text"
                                                                                name="last_name"
                                                                                onChange={(e) => this.handleFormInput(e, 'last_name')}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className='field'>
                                                                        <div>
                                                                            <label htmlFor="email">Email</label>
                                                                            <input
                                                                                type="email"
                                                                                name="email"
                                                                                onChange={(e) => this.handleFormInput(e, 'email')}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label htmlFor="phone">Phone</label>
                                                                            <input
                                                                                type="text"
                                                                                name="phone"
                                                                                onChange={(e) => this.handleFormInput(e, 'phone')}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className='ticket-details'>
                                                                        <h5 className="tertiary">Tickets Reserved:</h5>
                                                                        {
                                                                            props.data.reservation.reserved_tickets.map((ticket) => (
                                                                                <h5 key={ticket.ticket_type}>
                                                                                    {ticket.ticket_type} - {ticket.ticket_count}
                                                                                </h5>
                                                                            ))
                                                                        }
                                                                        <p className="small">Your reservation id is <span>{props.data.reservation.id}</span></p>
                                                                    </div>
                                                                    <div className='submit-field'>
                                                                        <input type="submit" value="Confirm"/>
                                                                    </div>
                                                                </form>
                                                            </FormContainer>
                                                        )
                                                    }
                                                </Mutation>
                                            </section>
                                        )
                                    }
                                    return null;
                                }
                            }
                        </Query>
                    </BookingContainer>
                    ) : (<DescriptionContainer>
                        <div className='description'>
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>
                                <span>
                                    <i className='material-icons small'>calendar_today</i>
                                    {event.date}
                                </span>
                                <span>
                                    <i className='material-icons small'>location_on</i>
                                    {event.location}
                                </span>
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
                                            <div className='button-container'>
                                                <Button
                                                    disabled={!buttonState}
                                                    onClick={(e) => {
                                                    Promise.resolve().then(
                                                        () => this.handleCheckout(createReservation)
                                                    )
                                                }}>
                                                    Checkout
                                                </Button>
                                            </div>
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
