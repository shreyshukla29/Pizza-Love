const { addProduct } = require("../controllers/product.controller");
const multer = require("multer");
const uploader = require("../middlewares/multer.middleware");
const productRouter = require("express").Router();

productRouter.post("/create", uploader.single("productImage"), addProduct);

module.exports = productRouter;
