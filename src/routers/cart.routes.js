const { getCartbyUser } = require("../controllers/cart.controller");
const express = require("express");
const {isLoggedIn} = require('../validation/auth.validator')

const cartRouter = express.Router();
cartRouter.get("/", isLoggedIn , getCartbyUser);

module.exports = cartRouter;
