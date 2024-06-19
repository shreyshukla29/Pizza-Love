const {placeOrder,cancelOrder, orderDetails ,allOrderDetailsofUser} = require('../controllers/order.controller')
const {isLoggedIn} = require('../validation/auth.validator')
const express = require('express');
const orderRouter = express.Router();

orderRouter.post('/process' , isLoggedIn , placeOrder);

orderRouter.delete('/:orderId/cancel' , isLoggedIn , cancelOrder);

orderRouter.get('/details/:orderId' ,isLoggedIn , orderDetails);
orderRouter.get('/details', isLoggedIn , allOrderDetailsofUser)

module.exports = orderRouter;