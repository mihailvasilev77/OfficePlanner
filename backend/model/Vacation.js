const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacationSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Vacation', vacationSchema);