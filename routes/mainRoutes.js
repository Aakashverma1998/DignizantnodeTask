module.exports = function(app){
    //Customer Route....
    const customer = require("./customer.route")
    app.use("/api/v1/customer",customer)
    //Product Route.....
    const product = require("./product.route")
    app.use("/api/v1/product",product)

}