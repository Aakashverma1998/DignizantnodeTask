const Customer = require('../models/customer.model')
const bcrypt = require("bcryptjs")
const helper = require("../utils/helper")
const dotenv = require("dotenv").config();
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken")
const {sendCustomerForgetpasswordMail} = require("../utils/mail")


const register = async (req, res) => {
    try {
        let emailMatch = await Customer.findOne({
            email: req.body.email
        });
        if (emailMatch) {
            return res.status(400).json({
                message: "CUSTOMER EXIST"
            });
        }
        let addCustomer = Customer({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address ? req.body.address : null,
            image: req.file ? req.file.buffer : null

        });
        let response = await addCustomer.save();

        return res.status(201).json({
            msg: "CUSTOMER REGISTER SUCCESSFULLY.",
            data: response
        });

    } catch (err) {
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    };
}
const login = async (req, res) => {
    try {
        let customer = await Customer.findOne({
            email: req.body.email
        });
        if (customer) {
            let passwordMatch = await bcrypt.compare(req.body.password, customer.password);
            if (passwordMatch) {
                let token = jwt.sign({
                    _id: customer._id.toString()
                }, process.env.secret_key, {
                    expiresIn: "1h"
                })
                customer.tokens.push({ token })
                await customer.save()
                res.status(201).json({
                    message: "Login Success",
                    data: customer,
                    token

                });
            } else {
                return res.json(helper.showvalidationErrorResponse("Unable to login"));
            };
        } else {
            return res.json(helper.showvalidationErrorResponse("Unable to login"));
        };
    } catch (err) {
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));

    };
}

const getImage = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if (!customer) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg/pdf/png')
        res.send(customer.image)
    } catch (err) {
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}

const updateProfile = async (req, res) => {
    try {
        let customer = await Customer.findByIdAndUpdate(req.body.customerId, { ...req.body }, { new: true })
        if (!customer) {
            throw new Error()
        }
        res.status(201).json({ massage: "customer update successfully", customer })
    } catch (err) {
        console.log(err)
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}



const forgetpassword = async (req, res) => {
    try {
        const emailOtp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        const customer = await Customer.findOneAndUpdate({ email: req.body.email }, { otp: emailOtp }, { new: true })
        await sendCustomerForgetpasswordMail(customer)
        res.send({ message: "otp sent successfully." })
    } catch (err) {
        console.log(err)
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));

    }

}
const verifyOtp = async (req, res) => {
    try {
        const otp = await Customer.findOneAndUpdate({ otp: req.body.otp }, { isEmailVerified: true, otp: null }, { new: true })
        if (!otp) {
            res.send({ message: "Invalid otp.!" })
        }else{
            res.send({message: "Email verified successfully"})
        }
    }catch(err){
        return res.json(helper.showInternalServerErrorResponse("Internal server error"));
    }
}
module.exports = {
    register,
    login,
    getImage,
    updateProfile,
    forgetpassword,
    verifyOtp
}