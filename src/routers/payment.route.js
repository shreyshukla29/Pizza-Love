
const express = require('express');
const paymentRouter = express.Router();
const {createOrder,verifyorder} =require('../controllers/payment.controller')

paymentRouter.post('/checkout',createOrder);
paymentRouter.post('/verify',verifyorder);


module.exports = paymentRouter;