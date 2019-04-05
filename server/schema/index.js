const { gql } = require('apollo-server');

const EventsModel = require('../models/events');
const BookingModel = require('../models/booking');

const typeDefs = gql`
    type Query {
        events: [Event!]!
    }
    type Mutation {
        createEvent(input: EventInput): Event
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
    type Booking {
        id: ID!
        event_id: String!
        reserved_tickets: [ReservedTickets]!
    }
    input BookingInput {
        event_id: String!
        reserved_tickets: [ReservedTicketInput]!
    }
    type ReservedTickets {
        name: String!
        booked: Int!
    }
    input ReservedTicketInput {
        name: String!
        booked: Int!
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
        createBooking: (root, { input }) => {
            let bookingModel = new BookingModel({
                event_id: input.event_id,
                reserved_tickets: input.reserved_tickets
            });

            return bookingModel.save();
        },
        cancelBooking: async (root, { id }) => {
            await BookingModel.deleteOne({ _id: id });
            return BookingModel.find({});
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
};
