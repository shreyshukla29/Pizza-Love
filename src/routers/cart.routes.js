const {
  getCartbyUser,
  modifyProductToCart,
} = require("../controllers/cart.controller");
const express = require("express");
const { isLoggedIn } = require("../validation/auth.validator");

const cartRouter = express.Router();
cartRouter.get("/", isLoggedIn, getCartbyUser);

cartRouter.post("/:operation/:productId", isLoggedIn, modifyProductToCart);

module.exports = cartRouter;
