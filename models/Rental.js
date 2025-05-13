const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    furniture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Furniture',
        required: true
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date'],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please add total price']
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rental', rentalSchema); 