const sgMail = require('@sendgrid/mail');
const dotenv = require("dotenv").config();

const sendCustomerForgetpasswordMail = async (cust) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to:cust.email,
        from:process.env.CUSTOMER_MAIL,
        subject: 'ForgetPassword Otp',
        html:`<strong> THIS IS STUDENT DETAILS CREATED BY TEACHER.</strong> <br>
        <table>
        <tr>
            <th>Email</th>
            <th>Otp</th>
        </tr>
        <tr>
            <td>${cust.email}</td>
            <td>${cust.otp}</td>
        </tr>
        </table>
    `
    }
    try{
        const result = await sgMail.send(msg)
        console.log("message sent successfully......")
    }catch(err){
        console.log(err)

    }


}
module.exports = {
    sendCustomerForgetpasswordMail
}