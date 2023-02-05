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

//This function  is  use for hind binary image during sending response to client.
productSchema.methods.toJSON = function(){
    let product = this
    const productObject = product.toObject()
    delete productObject.images
    return productObject
}

module.exports = mongoose.model("Product", productSchema)