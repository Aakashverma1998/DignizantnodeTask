const multer = require("multer")
const upload = multer({
    //dest:"images",
    limits:{fileSize:1000000},
    fileFilter: (req,file,cb)=>{
        if(!file.originalname.match(/\.(pdf|jpg|png)$/)){
            return cb(new Error("please upload correct format file."))
        }
        cb(undefined,true)

    }
})

module.exports = upload