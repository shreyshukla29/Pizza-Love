const { getCartbyID } = require("../controllers/cart.controller");
const express = require("express");

const cartRouter = express.Router();
cartRouter.get("/:id", getCartbyID);

module.exports = cartRouter;
