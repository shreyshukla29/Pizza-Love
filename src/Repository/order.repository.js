const Order = require('../schema/order.schema');
const internalServerError = require("../utils/internalServerError");
const BadRequestError = require("../utils/BadRequest");
const mongoose = require('mongoose')
async function createOrder(orderDetails) {
  try {
    const order = await Order.create({ ...orderDetails });
    return order;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } 
   else if (error instanceof mongoose.Error.CastError) {
    throw ({message:"Invalid order detail format",statusCode:500});
    }
    throw new internalServerError();
  }
}

async function getOrderDetails(orderId) {

   try {
      const order = await Order.findById(orderId);
      return order;
   } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } 
   else if (error instanceof mongoose.Error.CastError) {
    throw ({message:"Invalid ID format",statusCode:500});
    }
    throw new internalServerError();
  }
   
}


async function getAllOrders(userId){

  try {
    const order = await Order.find({user:userId});
    return order;
 }  catch (error) {
  if (error.name === "ValidationError") {
    const errorMessageList = Object.keys(error.errors).map((property) => {
      return error.errors[property].message;
    });
    throw new BadRequestError(errorMessageList);
  } 
 else if (error instanceof mongoose.Error.CastError) {
    
    throw ({message:"Invalid ID format",statusCode:500});
  }
  throw new internalServerError();
}

}

module.exports = { createOrder ,getOrderDetails,getAllOrders };
