const router = require("express").Router()
const {register,login,getImage,updateProfile,forgetpassword, verifyOtp} = require("../controllers/customer.controller")
const upload = require("../utils/multer")
const auth = require("../middleware/auth")
const {validateCustomer,customerValidation,validateLogin,validateUpdate,validateOtp,validateEmail} = require("../middleware/validation")

router.post("/signup",upload.single("image"),validateCustomer,customerValidation,register)

router.post("/login",validateLogin,customerValidation,login)

router.get("/:id/image", getImage)

router.post("/update",auth,validateUpdate,customerValidation,updateProfile)

router.post("/forgetpassword",validateEmail,customerValidation, forgetpassword)

router.post("/verifyOtp",validateOtp,customerValidation,verifyOtp)


module.exports = router