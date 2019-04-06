const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Events'
    },
    user_details: {
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
    },
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
