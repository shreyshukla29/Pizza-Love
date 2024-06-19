const {placeOrder,cancelOrder} = require('../controllers/order.controller')
const {isLoggedIn} = require('../validation/auth.validator')
const express = require('express');
const orderRouter = express.Router();

orderRouter.post('/process' , isLoggedIn , placeOrder);

orderRouter.delete('/:orderId/cancel' , isLoggedIn , cancelOrder);

module.exports = orderRouter;