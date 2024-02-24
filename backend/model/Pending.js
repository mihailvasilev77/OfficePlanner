const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingSchema = new Schema({
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
    },
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model('Pending', pendingSchema);