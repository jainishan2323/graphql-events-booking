import React from 'react';

import { Container } from './styles';

class EventContainer extends React.PureComponent<any, any> {
    public state = {
        reserved_tickets: {}
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
    public handleCheckout = () => {

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
    public render() {
        const {
            event
        } = this.props;
        return (
            <Container>
                <div className='img-container'>
                    <img src={event.banner_url} alt='bg image'/>
                </div>
                <div className='description'>
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>
                        <span>{event.date}</span>
                        <span>{event.location}</span>
                    </p>
                </div>
                <div>
                    <div>
                        icons
                    </div>
                    <h4>
                        Tickets
                    </h4>
                    <div className='ticket-container'>
                        {
                            this.renderTicketList()
                        }
                        <button onClick={this.handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </Container>
        )
    }
}

export default EventContainer;
