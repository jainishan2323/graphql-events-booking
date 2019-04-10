const { gql, UserInputError } = require('apollo-server');

const EventsModel = require('../models/events');
const BookingModel = require('../models/booking');
const ReservationModel = require('../models/reservation');

const typeDefs = gql`
    type Query {
        events: [Event!]!
        event(event_id: ID!): Event!
        reservation(reservation_id: ID!): Reservation!
    }
    type Mutation {
        createEvent(input: EventInput): Event
        createReservation(input: ReservationInput): Reservation
        cancelReservation(reservation_id: ID!): Event
        createBooking(input: BookingInput): Booking
        cancelBooking(id: ID!): [Booking]
    }
    type Event {
        id: ID!
        name: String!,
        url: String!,
        banner_url: String!,
        date: String!,
        location: String,
        description: String,
        ticket_types: [TicketTypes]!,
    }
    input EventInput {
        name: String!,
        url: String!,
        banner_url: String!,
        date: String!,
        location: String,
        description: String,
        ticket_types: [InputTicketTypes]!
    }
    type TicketTypes {
        id: ID!
        name: String!
        quantity_available: Int
    }
    input InputTicketTypes {
        name: String!
        quantity_available: Int
    }
    type Reservation {
        id: ID!
        event_id: String!
        reserved_tickets: [ReservedTickets]!
    }
    input ReservationInput {
        event_id: String!
        reserved_tickets: [ReservedTicketInput]!
    }
    type ReservedTickets {
        ticket_type: String!
        ticket_count: Int!
    }
    input ReservedTicketInput {
        ticket_type: String!
        ticket_count: Int!
    }
    type Booking {
        id: ID!
        event: Event!
        user_details: User!
    }
    input BookingInput {
        reservation_id: String!
        user_details: UserInput!
    }
    type User {
        id: ID!,
        first_name: String!,
        last_name: String!,
        email: String,
        phone: String,
    }
    input UserInput {
        first_name: String!,
        last_name: String!,
        email: String,
        phone: String,
    }
`;

const resolvers = {
    Query: {
        events: () => EventsModel.find({}),
        event: (parent, args) => {
            return EventsModel.findById(args.event_id)
        },
        reservation: (parent, args) => {
            return ReservationModel.findById(args.reservation_id)
        }
    },
    Mutation: {
        createEvent: (root, { input }) => {
            let eventsModel = new EventsModel({
                name: input.name,
                url: input.url,
                banner_url: input.banner_url,
                date: input.date,
                location: input.location,
                description: input.description,
                ticket_types: input.ticket_types
            });

            return eventsModel.save();
        },
        createReservation: async (root, { input }) => {
            try {
                const event = await EventsModel.findById(input.event_id);
            
                if (!event) {
                    throw new UserInputError(`Inavlid event id ${input.event_id}`);
                }

                let reservationModel = new ReservationModel({
                    event_id: input.event_id,
                    reserved_tickets: input.reserved_tickets
                });

                const reservation = await reservationModel.save();

                // find the ticket and it's type in event model and update it
                const updatedTickets = event.ticket_types.map((ticket) => {
                    const inputTicket = input.reserved_tickets.find((_ticket) => _ticket.ticket_type === ticket.name);
                    if (inputTicket && inputTicket.ticket_type) {
                        return {
                            name: ticket.name,
                            quantity_available: ticket.quantity_available - inputTicket.ticket_count
                        }
                    }
                    return {
                        name: ticket.name,
                        quantity_available: ticket.quantity_available
                    };
                });

                if (Array.isArray(updatedTickets) && updatedTickets.length > 0) {
                    await EventsModel.updateOne({ _id: input.event_id}, { ticket_types: updatedTickets });
                }

                return reservation;

            } catch (err) {
                throw new Error('Something went wrong with creating reservation', err);
            }
        },
        cancelReservation: async (root, { reservation_id }) => {
            const reservation = await ReservationModel.findById(reservation_id);

            if (!reservation) {
                throw new UserInputError(`Inavlid reservation id ${reservation_id}`);
            }

            const event = await EventsModel.findById(reservation.event_id);

            if (!event) {
                throw new Error(`Reservation with the ${reservation.event_id} not found!`);
            }

            // find the ticket and it's type in event model and update it
            const updatedTickets = event.ticket_types.map((ticket) => {
                const reservedTickets = reservation.reserved_tickets.find((_ticket) => _ticket.ticket_type === ticket.name);
                if (reservedTickets && reservedTickets.ticket_type) {
                    return {
                        name: ticket.name,
                        quantity_available: ticket.quantity_available + reservedTickets.ticket_count
                    }
                }
                return {
                    name: ticket.name,
                    quantity_available: ticket.quantity_available
                };
            });

            // delete the reservation
            await ReservationModel.deleteOne({_id: reservation_id});

            // release the tickets
            await EventsModel.updateOne({ _id: reservation.event_id}, { ticket_types: updatedTickets });

            return EventsModel.findById(reservation.event_id);
            
        },
        createBooking: async (root, { input }) => {
            try {
                let reservation = await ReservationModel.findById(input.reservation_id);
                reservation = reservation.toObject();
                if (!reservation) {
                    throw new UserInputError('Reservation not found!');
                }
                const event = await EventsModel.findById(reservation.event_id);
                if (!event) {
                    throw new Error('Event not found');
                }
                let bookingModel = new BookingModel({
                    user_details: input.user_details,
                    event,
                });

                // remove the reservation of it now - todo: modularize
                const updatedTickets = event.ticket_types.map((ticket) => {
                    const reservedTickets = reservation.reserved_tickets.find((_ticket) => _ticket.ticket_type === ticket.name);
                    if (reservedTickets && reservedTickets.ticket_type) {
                        return {
                            name: ticket.name,
                            quantity_available: ticket.quantity_available - reservedTickets.ticket_count
                        }
                    }
                    return {
                        name: ticket.name,
                        quantity_available: ticket.quantity_available
                    };
                });
    
                 // delete the reservation
                await ReservationModel.deleteOne({_id: input.reservation_id});

                // release the tickets
                // await EventsModel.updateOne({ _id: reservation.event_id}, { ticket_types: updatedTickets });

                return bookingModel.save();
            } catch (err) {
                throw new Error('Unable to create booking');
            }
        },
    }
}

module.exports = {
    typeDefs,
    resolvers
};
