const { requestOrder , requestOrderCancel,getOrderDetailsofUser,getAllOrderDetails, updateOrderStatus } = require("../services/order.service");
const AppError = require('../utils/appError')
const mongoose = require('mongoose')


async function placeOrder(req, res) {
  const orderDetails = req.body;
  const userId = req.user.id;
  console.log('order request received')

  try {
    const order = await requestOrder(orderDetails, userId);
    return res.status(200).json({
        success:true,
        data:order,
        message:'order placed succesfully',
        error:{}
      });

  }  catch (error) {
    console.log(error)

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


async function cancelOrder(req ,res){

    const orderId = req.params.orderId;

    try {
        const order = await requestOrderCancel(orderId);
        return res.status(200).json({
            success:true,
            data:order,
            message:'order cancelled succesfully',
            error:{}
          })
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


async function orderDetails(req ,res) {

  const orderId = req.params.orderId;

  try {
    const order = await getOrderDetailsofUser(orderId);
    console.log('order of user',order)
    return res.status(200).json({
        success:true,
        data:order,
        message:'order fetch succesfully',
        error:{}
      })
   }   catch (error) {

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

async function allOrderDetailsofUser(req ,res){

  const userId = req.user.id;
  try {
    const order = await getAllOrderDetails(userId);
    console.log('orders of user',order)
    return res.status(200).json({
        success:true,
        data:order,
        message:'orders fetch  succesfully',
        error:{}
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

async function changeOrderStatus(req ,res) {

  const status = req.body.status;

  try {

    const order = await updateOrderStatus(req.paramse.orderId, status);

    return res.status(200).json({
      sucess:true,
      data:order,
      message:'order status updated succesfully',
      error:{}
    })
    
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

module.exports = { placeOrder , cancelOrder,orderDetails,allOrderDetailsofUser , changeOrderStatus};


