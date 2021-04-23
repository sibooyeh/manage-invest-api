const mongoose = require('mongoose');

const ExpensesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        require: true,
    },
    note: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    }, 
});

module.exports = mongoose.model('expenses', ExpensesSchema);