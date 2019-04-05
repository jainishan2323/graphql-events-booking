const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    event_id: String,
    reserved_tickets: [
        {
            name: String,
            booked: Number,
        }
    ]
});

module.exports = mongoose.model('Booking', bookingSchema);
