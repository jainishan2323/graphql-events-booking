const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schema/');

const env = {
    MONGO_USER: "ishan_mac",
    MONGO_PASSWORD: "9828998833",
    MONGO_DB: "events-reservation"
};

// DB Connection
mongoose
    .connect(
        `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWORD}@mytestcluster-nmifr.mongodb.net/${env.MONGO_DB}?retryWrites=true`
    )
mongoose.connection.once('open', () => { console.log('DB Connected')});

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});

// server.applyMiddleware(cors());

server.listen().then(({ url}) => console.log(url));