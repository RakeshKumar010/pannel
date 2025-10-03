const mongoose = require('mongoose');

// Define the schema structure for a product document
const productSchema = new mongoose.Schema({
    // Product identification and description
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true, // Removes whitespace from both ends of a string
        maxlength: [200, 'Name cannot be more than 200 characters']
    },
    
    // Pricing details
    price: { // Sale Price
        type: Number,
        required: [true, 'Sale price is required'],
        min: [0, 'Price cannot be negative']
    },
    mrp: { // Maximum Retail Price (Original Price)
        type: Number,
        required: [true, 'MRP is required'],
        min: [0, 'MRP cannot be negative']
    },
    // Discount is calculated, so it's not required on input, but saved to the DB
    discountPercent: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    // Inventory and performance metrics
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0,
        min: 0
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Export the Product model
module.exports = mongoose.model('product', productSchema);
