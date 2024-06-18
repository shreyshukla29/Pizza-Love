const { getCart } = require("../services/cart.service");
const AppError = require('../utils/appError')


async function getCartbyUser(req, res) {
  const userId = req.user.id;


  try {
    const cart = await getCart(userId);
    return res.status(200).json({
      success:true,
      message : 'Successfully fetched the cart',
      error : {},
      data:cart,
    })
  } catch (error) {
    if(error instanceof AppError){
      return res.status(error.statusCode).json({
        success:false,
        message : error.message,
        error : error,
        data:{},
      })

    }
  } return res.status(500).json({
    success:false,
    message : 'Something went wrong',
    error : error,
    data:{},
  })
}

module.exports = {
  getCartbyUser,
};
