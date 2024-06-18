const {
  addProduct,
  getProduct,
  deleteProductById,
} = require("../controllers/product.controller");
const { isAdmin, isLoggedIn } = require("../validation/auth.validator");

const multer = require("multer");
const uploader = require("../middlewares/multer.middleware");
const productRouter = require("express").Router();

productRouter.post(
  "/create",
  isLoggedIn,
  isAdmin,
  uploader.single("productImage"),
  addProduct
);

productRouter.get("/:id", getProduct);
productRouter.delete("/delete/:id", deleteProductById);

module.exports = productRouter;
