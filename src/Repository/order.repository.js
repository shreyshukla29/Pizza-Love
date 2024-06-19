const Order = require('../schema/order.schema');

async function createOrder(orderDetails) {
  try {
    const order = await Order.create({ ...orderDetails });
    return order;
  }catch (error) {
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

async function getOrderDetails(orderId) {

   try {
      const order = await Order.findById(orderId);
      return order;
   } catch (error) {
      console.log(error);
      throw new internalServerError();
      
  }
   
}

module.exports = { createOrder ,getOrderDetails };
