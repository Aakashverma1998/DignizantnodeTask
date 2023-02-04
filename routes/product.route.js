const router = require("express").Router()
const {addProduct,getProduct,getImage,updateProduct,deleteProduct,orderProduct} = require("../controllers/product.controller")
const upload = require("../utils/multer")
const auth = require("../middleware/auth")
const {validateProduct,productValidation,updateProducts,deleteProducts,orderProducts} = require("../middleware/validation")

router.post("/addProduct",upload.array("images",4),validateProduct,productValidation,addProduct)

router.post("/allProduct",getProduct)

router.get("/:id/product", getImage)

router.post("/updateProduct",auth,updateProducts,productValidation,updateProduct)

router.post("/deleteProduct",auth,deleteProducts,productValidation,deleteProduct)

router.post("/orderProduct",auth,orderProducts,productValidation,orderProduct)


module.exports = router