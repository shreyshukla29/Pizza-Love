const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const crypto = require('crypto');

const ServerConfig = require('../../config/serverConfig');

const razorpay = new Razorpay({
    key_id: ServerConfig.RAZORPAY_API_KEY,
    key_secret: ServerConfig.RAZORPAY_API_SECRET,
  });

 async function createOrder (req, res){
  const { amount } = req.body;

  const options = {
    amount: amount * 100, 
    currency: 'INR',
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(200).json({ 
      message:"order created successfullt",
      data: order,
      success : true,
      error:{},
     });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error creating order',
      success: false,
      data:{},
      error:error
    });
  }
};

function  verifyorder(req, res){
  const { response } = req.body;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

  const generated_signature = crypto.createHmac('sha256',ServerConfig.RAZORPAY_API_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    console.log(generated_signature, " ", razorpay_signature);
    res.status(400).json({ success: false });
  }
};

module.exports = {createOrder,verifyorder};
