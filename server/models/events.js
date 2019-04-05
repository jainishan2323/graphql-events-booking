const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    name: String,
    url: String,
    banner_url: String,
    date: String,
    location: String,
    description: String,
    ticket_types: [
        {
            name: String,
            quantity_available: Number,
        }
    ]
});

module.exports = mongoose.model('Events', eventsSchema);
