const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    price: { type: String },
    discountPrice: { type: String },
    description: { type: String },
    stock: { type: String },
    isDeleted: { type: Boolean, default: false },
    images: [{ type: Buffer }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)