const productRoutes = require("./app/product/routes");
const cartRoutes = require('./app/cart/routes')

module.exports = app => {
    app.use("/product", productRoutes);
    app.use("/cart", cartRoutes);
}