const { getCartByUserId } = require("../Repository/cart.repository");
const {
  createOrder,
  getOrderDetails,
  getAllOrders,
} = require("../Repository/order.repository");
const NotFoundError = require("../utils/notFoundError");
const BadRequestError = require("../utils/BadRequest");
const AppError = require("../utils/appError");
const internalServerError = require("../utils/notFoundError");
const { emptyCart } = require("../services/cart.service");
const ServerConfig = require("../../config/serverConfig");
const UserRepository = require("../Repository/user.repository");
const {Suprsend,Event,WorkflowTriggerRequest, Workflow} = require("@suprsend/node-sdk");

const supr_client = new Suprsend(ServerConfig.WORKSPACE_KEY, ServerConfig.WORKSPACE_SECRET);

async function requestOrder(orderDetails, userId) {
  const userRepository = new UserRepository();

  console.log(ServerConfig.WORKSPACE_KEY)
  try {
    console.log('order request in service')
    const cart = await getCartByUserId(userId);
    if (!cart) {
      console.log('error in cart')
      throw new NotFoundError("Cart");
    }console.log('cart found')

    const { items } = await cart.populate("items.product");

    if (items.length === 0) {
      console.log('error in items')
      throw new NotFoundError("items in cart");
    }
    console.log('items found')

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
      paymentId: orderDetails.paymentId,
      totalPrice,
    };

    const order = await createOrder(orderData);
    console.log('order created',order)

    await emptyCart(userId);
    console.log('cart empty')

 
    if(order){

      const user = await userRepository.findUserbyId(userId);   
      // Initialize user instance

      console.log('hello')
      const workflow_payload = {
        "workflow": "order",
        // actor object
        // recipient object
        "recipients": [
            {
                "distinct_id": user.email,
                "$email": user.email,
                "user_prop_1": "v1",
                "$channels":["email","inbox"],
            }  
        ],
        // dynamic data to render template and workflow variables
        "data": {
        "k1": "v1",
        "nested_var": {
            "k2": "v2"
         }
      }
    }
      
    const wf = new WorkflowTriggerRequest(workflow_payload)
      
    const resp = supr_client.workflows.trigger(wf);
    resp.then(res => console.log("response", res)).catch((err)=>console.log('errro in wsf',err));

       
    }

    return order;
  } catch (error) {
    console.log('error overall',error)
    throw new internalServerError();
  }
}

async function requestOrderCancel(orderId) {
  try {
    const order = await getOrderDetails(orderId);
    if (!order) {
      throw new NotFoundError("Order");
    }

    if (order.status === "CANCELLED" || order.status === "DELIVERED") {
      throw new AppError(`Order is already ${order.status}`);
    }

    order.status = "CANCELLED";
    await order.save();

    return order;
  } catch (error) {
    throw new internalServerError();
  }
}

async function getOrderDetailsofUser(orderId) {
  try {
    const order = await getOrderDetails(orderId);
    if (!order) {
      throw new NotFoundError("Order");
    }
    return order.populate("items.product");
  } catch (error) {
    throw new internalServerError();
  }
}

async function getAllOrderDetails(userId) {
  try {
    const allorder = await getAllOrders(userId);
    if (!allorder) {
      throw new NotFoundError("Orders");
    }

    return allorder;
  } catch (error) {
    throw new internalServerError();
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    const order = await getOrderDetails(orderId);
    if (!order) {
      throw new NotFoundError("Order");
    }

    order.status = status;
    await order.save();

    return order;
  } catch (error) {
    throw new internalServerError();
  }
}
module.exports = {
  requestOrder,
  requestOrderCancel,
  getOrderDetailsofUser,
  getAllOrderDetails,
  updateOrderStatus,
};
