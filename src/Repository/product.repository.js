const Product = require("../schema/product.schema");
const internalServerError = require("../utils/internalServerError");
const BadRequestError = require("../utils/BadRequest");
const { ObjectId } = require("mongodb");
async function createProduct(productDetails) {
  try {
    const response = await Product.create(productDetails);

    return response;
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

async function getProduct(productId) {
  try {
    const product = await Product.findById(productId);

    return product;
  } catch (error) {
    console.log("error in finding", error);
    throw new internalServerError();
  }
}

async function deleteProduct(productId) {
  try {
    const response = await Product.findByIdAndDelete(productId);
    return response;
  } catch (error) {

    
    console.log(error);
    if (error == "CastError") {
      
    }
    throw new internalServerError();
  }
}

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
};
