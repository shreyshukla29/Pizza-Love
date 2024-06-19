const {placeOrder,cancelOrder, orderDetails ,allOrderDetailsofUser, changeOrderStatus} = require('../controllers/order.controller')
const {isLoggedIn, isAdmin} = require('../validation/auth.validator')
const express = require('express');
const orderRouter = express.Router();

orderRouter.post('/process' , isLoggedIn , placeOrder);

orderRouter.put('/:orderId/cancel' , isLoggedIn , cancelOrder);
orderRouter.get('/details/:orderId' ,isLoggedIn , orderDetails);
orderRouter.get('/details', isLoggedIn , allOrderDetailsofUser);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, changeOrderStatus);
module.exports = orderRouter;