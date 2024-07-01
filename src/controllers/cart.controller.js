const { getCart, modifyCart, emptyCart } = require("../services/cart.service");
const AppError = require("../utils/appError");
const mongoose = require('mongoose')
async function getCartbyUser(req, res) {
  const userId = req.user.id;

  try {
    const cart = await getCart(userId);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the cart",
      error: {},
      data: cart,
    });
  }  catch (error) {

    if(error instanceof AppError || error instanceof mongoose.Error.CastError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: error,
            data: {},
          });
        }
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error,
          data: {},
        });
     
    }
}

async function modifyProductToCart(req, res) {
  try {
    const cart = await modifyCart(
      req.user.id,
      req.params.productId,
      req.params.operation =='add'
    );
    return res.status(200).json({
      success: true,
      message: "Successfully add product to the cart",
      error: {},
      data: cart,
    });
  }  catch (error) {

    if(error instanceof AppError || error instanceof mongoose.Error.CastError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: error,
            data: {},
          });
        }
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error,
          data: {},
        });
     
    }
}

async function clearCart(req, res) {
  const userId = req.user.id;

  try {
    const cart = await emptyCart(userId);
    return res.json({
      sucess:true,
      data:cart,
      message:'cart clear succesfully',
      error:{}
    }).status(200);
  }  catch (error) {

    if(error instanceof AppError || error instanceof mongoose.Error.CastError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            error: error,
            data: {},
          });
        }
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error: error,
          data: {},
        });
     
    }
}

module.exports = {
  getCartbyUser,
  modifyProductToCart,
  clearCart,
};
