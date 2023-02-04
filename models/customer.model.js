const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const customerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    address: { type: String },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    otp:{type:String},
    image:{type:Buffer}
}, {
    timestamps: true
})


//REMOVE TOKEN AND PASSWORD DURING SEND RESPONSE TO USER.
customerSchema.methods.toJSON = function(){
    let user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.image
    return userObject
}

customerSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})
module.exports = mongoose.model("Customer", customerSchema)