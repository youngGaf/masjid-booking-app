const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    prayer: {
        type: String,
        required: true,
        enum: ['subhi', 'zuhur', 'asr', 'maghrib', 'ishai', 'jummah']
    },
    batch: {
        type: String,
        required: true
    },
    bookingDate:{
        type: String
    },
}, {
    timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;