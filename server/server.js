const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const cors = require('cors');

const { typeDefs, resolvers } = require('./schema/');

// DB Connection
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mytestcluster-nmifr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
mongoose.connection.once('open', () => { console.log('DB Connected')});

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers
});

// server.applyMiddleware(cors());

server.listen().then(({ url}) => console.log(url));