const Cart = require("../schema/cart.schema");
const internalServerError = require("../utils/internalServerError");
const BadRequestError = require("../utils/BadRequest");
const mongoose = require('mongoose')
async function createCart(userId) {
  try {
    const newCart = await Cart.create({
      user: userId,
    });
   
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

async function getCartByUserId(userId){
    try {
        const cart =await Cart.findOne({
            user:userId
        });
     return cart;

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

module.exports = { createCart ,getCartByUserId };
