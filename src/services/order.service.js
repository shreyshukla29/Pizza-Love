const { getCartByUserId } = require("../Repository/cart.repository");
const { createOrder , getOrderDetails } = require("../Repository/order.repository");
const BadRequestError = require("../utils/BadRequest");
const {emptyCart} = require('../services/cart.service')
async function requestOrder(orderDetails, userId) {
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundError('Cart');
    }
   
    const { items } = await cart.populate("items.product");
    
    if (items.length === 0) {
        throw new NotFoundError("items in cart");
    }

    const totalPrice = items.reduce((total, item) => {
      return total + item.quantity * item.product.productPrice;
    }, 0);

    const orderData = {
      user: userId,
      items: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      paymentMethod: orderDetails.paymentMethod,
      address: orderDetails.address,
      totalPrice,
    };
   
    const order = await createOrder(orderData);

    await emptyCart(userId);

    return order;
  } catch (error) {
    throw new internalServerError()
  }
}


async function requestOrderCancel(orderId) {

    try {
        const order = await getOrderDetails (orderId);
        if (!order) {
            throw new NotFoundError("Order");
          }
      
          if (order.status === 'CANCELLED' || order.status === 'DELIVERED') {
          throw new AppError(`Order is already ${order.status}`)
          }
      
          order.status = 'CANCELLED';
          await order.save();

          return order;
    } catch (error) {
        throw new internalServerError();
    }
    
}

module.exports = { requestOrder , requestOrderCancel };
