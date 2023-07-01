const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["man", "woman", "kids"],
        required: true,
    }, 
    type: {
        type: String,
        enum: ["T-shirt","Shirt", "Coats & Jackets", "Sweats", "Dress", "Skirt", "Pants", "Short", "Shoes", "Sleepwear", "Baby Clothes", "Batch", "Others"],
        required: true
    },
    size: {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "0-3 months", "3-6 months", "6-9 months", "9-12 months", "12-18 months", "18-24 months","24+ months"],
        required: true,
    },
    condition: {
        type: String,
        enum: ["Brand New", "Almost New", "Good", "Acceptable", "Repairable"],
        required: true,
    },
    location: {
        type: String,
        required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
    phone: {
        type: String,
        required: true},
    picture: {
        type: String,
        required: true
    },
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Item = model("Item", itemSchema);

module.exports = Item;