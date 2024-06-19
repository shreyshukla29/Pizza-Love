const { requestOrder , requestOrderCancel } = require("../services/order.service");
async function placeOrder(req, res) {
  const orderDetails = req.body;
  const userId = req.user.id;

  try {
    const order = await requestOrder(orderDetails, userId);
    return res.status(200).json({
        sucess:true,
        data:order,
        message:'order placed succesfully'
      });

  }  catch (error) {
    if (error instanceof AppError) {
      if (error instanceof AppError) {
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
}


async function cancelOrder(req ,res){

    const orderId = req.params.orderId;

    try {
        const order = await requestOrderCancel(orderId);
        return res.status(200).json({
            sucess:true,
            data:order,
            message:'order cancelled succesfully'
          })
    }  catch (error) {
        if (error instanceof AppError) {
          if (error instanceof AppError) {
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

}

module.exports = { placeOrder , cancelOrder };
