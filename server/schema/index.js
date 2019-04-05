const { gql, UserInputError } = require('apollo-server');

const EventsModel = require('../models/events');
const BookingModel = require('../models/booking');
const ReservationModel = require('../models/reservation');

const typeDefs = gql`
    type Query {
        events: [Event!]!
    }
    type Mutation {
        createEvent(input: EventInput): Event
        createReservation(input: ReservationInput): Reservation
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
        name: String!
        quantity_available: Int
    }
    input InputTicketTypes {
        name: String!
        quantity_available: Int
    }
    type User {
        id: ID!,
        first_name: String!,
        last_name: String!,
        email: String,
        phone: String,
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
        reservation_id: String!
        user_details: String!
    }
    input BookingInput {
        event_id: String!
        reservation_id: String!
        user_details: String!
    }
`;

const resolvers = {
    Query: {
        events: () => EventsModel.find({})
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

        },
        // createBooking: (root, { input }) => {
        //     let bookingModel = new BookingModel({
        //         event_id: input.event_id,
        //         reserved_tickets: input.reserved_tickets
        //     });

        //     return bookingModel.save();
        // },
        // cancelBooking: async (root, { id }) => {
        //     await BookingModel.deleteOne({ _id: id });
        //     return BookingModel.find({});
        // }
    }
}

module.exports = {
    typeDefs,
    resolvers
};
