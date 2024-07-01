const { getCartByUserId } = require("../Repository/cart.repository");
const NotFoundError = require("../utils/notFoundError");

const BadRequestError = require("../utils/BadRequest");
const AppError = require("../utils/appError");
const internalServerError = require('../utils/notFoundError')
const { getProduct } = require("../Repository/product.repository");
async function getCart(userId) {

  try {
    const cart = await getCartByUserId(userId);

    if (!cart) {
      throw new NotFoundError("Cart");
    }
    return cart.populate('items.product')
  } catch (error) {
    throw new internalServerError();
    
  }
 
}

async function modifyCart(userId, productId,shouldAdd =true) {
  const cart = await getCart(userId);
  const quantityValue = shouldAdd ? 1 :-1;
 
  const product = await getProduct(productId);

  if (!product) {
    throw new NotFoundError("Product");
  }

  if (!product.InStock) {
    throw new BadRequestError(["Product not available in stock"]);
  }

  // may e the product already present
  let foundProduct = false;

  cart.items.forEach((item) => {
    if (item.product._id == productId) {
      if (product.quantity >= item.quantity + 1 && item.quantity >0) {
        item.quantity += quantityValue;
        foundProduct = true;
      } else if(product.quantity == item.quantity){
        throw new AppError('Qunatity of items request is not available');

      }
       if(item.quantity == 0){
        cart.items = cart.items.filter(item => item.product._id != productId)
        return ;
      }
    }
  });
  

  if (!foundProduct ) {
    
    if(shouldAdd){
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }else{
      throw new NotFoundError("Product");
    }
   
  }

  await cart.save();

  return cart.populate('items.product');
}


async function emptyCart(userId){

  try {
    const cart = await getCart(userId);
    if(!cart){
      throw new NotFoundError('Cart')
     
    }
    cart.items =[];
    cart.save();
    return cart;
  } catch (error) {
    throw new internalServerError();
  }
  

}

module.exports = { getCart, modifyCart ,emptyCart };
