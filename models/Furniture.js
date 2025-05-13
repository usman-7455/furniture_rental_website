const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['sofa', 'bed', 'chair', 'table', 'office', 'other']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price must be positive']
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    available: {
        type: Boolean,
        default: true
    },
    condition: {
        type: String,
        required: [true, 'Please specify condition'],
        enum: ['new', 'like-new', 'good', 'fair']
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Furniture', furnitureSchema); 