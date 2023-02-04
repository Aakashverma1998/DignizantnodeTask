const {check, validationResult} = require("express-validator");
exports.validateCustomer = [
    check("name").trim().not().isEmpty().withMessage("name is required...!"),
    check("email").trim().not().isEmpty().withMessage("email is required..!").normalizeEmail().isEmail().withMessage("Invalid Email.!"),
    check("password").trim().not().isEmpty().withMessage("password is required..!").isLength({min:8,max:20}).withMessage("Password must be 8 to 20 characters long.!"),
    check("address").trim().optional(),
    check("image").trim().optional(),
    check("phone").trim().not().isEmpty().withMessage("phone is required..!").isLength({min:10,max:10}).withMessage("Please enter correct phone no.!")

]
module.exports.validateLogin = [
    check("email").trim().not().isEmpty().withMessage("Email is required...!").normalizeEmail().isEmail().withMessage("Please enter correct email..!"),
    check("password").trim().not().isEmpty().withMessage("Password is required..!").isLength({min:8}).withMessage("Please enter correct password..!"),
]

module.exports.validateUpdate = [
    check("customerId").trim().not().isEmpty().withMessage("CustomerId is required...!"),
    check("name").trim().optional(),
    check("phone").trim().optional(),
    check("address").trim().optional()


]
module.exports.validateOtp = [
    check("otp").trim().not().isEmpty().withMessage("otp is required...!"),


]

module.exports.validateEmail = [
    check("email").trim().not().isEmpty().withMessage("Email is required...!"),


]
exports.validateProduct = [
    check("name").trim().not().isEmpty().withMessage("name is required...!"),
    check("description").trim().not().isEmpty().withMessage("description is required..!"),
    check("stock").trim().not().isEmpty().withMessage("stock is required..!"),
    check("discountPrice").trim().not().isEmpty().withMessage("discount price is required..!"),
    check("image").trim().optional(),
    check("price").trim().not().isEmpty().withMessage("price is required..!"),
]

exports.updateProducts = [
    check("productId").trim().not().isEmpty().withMessage("productId is required..!"),
    check("name").trim().optional(),
    check("description").trim().optional(),
    check("stock").trim().optional(),
    check("discountPrice").trim().optional(),
    check("image").trim().optional(),
]
exports.deleteProducts = [
    check("productId").trim().not().isEmpty().withMessage("productId is required..!"),
]

exports.orderProducts = [
    check("productId").trim().not().isEmpty().withMessage("productId is required..!"),
    check("stock").trim().optional()
]


exports.customerValidation = (req,res, next)=>{
    const result = validationResult(req).array()
    if(!result.length) return next();
    const error = result[0].msg;
    res.json({status:400, message:error})
}
exports.productValidation = (req,res, next)=>{
    const result = validationResult(req).array()
    if(!result.length) return next();
    const error = result[0].msg;
    res.json({status:400, message:error})
}