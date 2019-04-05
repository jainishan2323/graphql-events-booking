const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/');

const app = express();

app.use(cors());

// DB Connection
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mytestcluster-nmifr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
mongoose.connection.once('open', () => { console.log('DB Connected')});

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true,
}));

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Now listening for requests on ${PORT}`)
});
