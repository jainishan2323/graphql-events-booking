const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    event_id: String,
    reserved_tickets: [
        {
            ticket_type: String,
            ticket_count: Number,
        }
    ]
});

module.exports = mongoose.model('Reservation', reservationSchema);
