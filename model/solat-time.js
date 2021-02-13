const mongoose = require('mongoose');


const solatSchema = new mongoose.Schema({
    prayer: {
        type: String,
        required: true,
        enum: ['subhi', 'zuhur', 'asr', 'maghrib', 'ishai', 'jummah']
    },
    batch: {
        type: String,
        required: true
    },
    batches: {
        type: String,
        required: true
    },
    time:{
        type: String
    },
    registeredDate:{
        type: String
    },
}, {
    timestamps: true
})

const Solah = mongoose.model('Solah', solatSchema);

module.exports = Solah;