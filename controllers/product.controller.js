const Product = require('../models/product.model')
const helper = require("../utils/helper")

const addProduct = async (req, res) => {
    try {
        const product = await Product.create({ ...req.body })
        req.files.map(async (img) => {
            product.images.push(img ? img.buffer : null)
        })
        await product.save()
        res.status(201).json({
            message: "Product Added Successfully.",
            data: product
        })

    } catch (err) {
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.find({isDeleted:false}).limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
        res.status(200).json({
            message: "Product Featch Successfully.",
            data: product
        })
    } catch (err) {
        console.log(err)
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

const updateProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.body.productId,{...req.body},{new:true})
        res.send(product)
    }catch(err){
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.body.productId,{isDeleted:true},{new:true})
        res.send(product)
    }catch(err){
        console.log(err)
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

const orderProduct = async(req,res)=>{
    try{
        const currentProduct = await Product.findById(req.body.productId)
        const currentStock = await Product.findByIdAndUpdate(req.body.productId,{stock:currentProduct.stock-req.body.stock},{new:true})
        res.send(currentStock)
    }catch(err){
        console.log(err)
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));

    }
  
}

const getImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(product.images)
    } catch (err) {
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    orderProduct,
    getImage
}
