const {
  getCartbyUser,
  modifyProductToCart,
  clearCart,
} = require("../controllers/cart.controller");
const express = require("express");
const { isLoggedIn } = require("../validation/auth.validator");

const cartRouter = express.Router();
cartRouter.get("/", isLoggedIn, getCartbyUser);

cartRouter.post("/:operation/:productId", isLoggedIn, modifyProductToCart);

cartRouter.delete("/products", isLoggedIn, clearCart);

module.exports = cartRouter;
