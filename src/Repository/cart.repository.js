const Cart = require("../schema/cart.schema");
const internalServerError = require("../utils/internalServerError");
const BadRequestError = require('../utils/BadRequest');
async function createCart(userId) {
  try {
    const newCAart = await Cart.create({
      user: userId,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } else {
      throw new internalServerError();
    }
  }
}


async function getCartByUserId(userId){
    try {
        const cart =await Cart.findOne({
            user:userId
        });
     return cart;

    } catch (error) {
        console.log(error);
        throw new internalServerError();
        
    }
}

module.exports = { createCart ,getCartByUserId };
