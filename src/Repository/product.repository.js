const Product = require("../schema/product.schema");
const internalServerError = require("../utils/internalServerError");
const BadRequestError = require("../utils/BadRequest");
const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');
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
    }  else if (error instanceof mongoose.Error.CastError) {
      throw ({message:"Invalid product detail format",statusCode:500});
    }
    else {
      throw new internalServerError();
    }
  }
}

async function getProduct(productId) {
  try {
    const product = await Product.findById(productId);
    console.log('product',product)
    return product;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } 
   else if (error instanceof mongoose.Error.CastError) {
    throw ({message:"Invalid ID format",statusCode:500});
    }
    throw new internalServerError();
  }
}

async function deleteProduct(productId) {
  try {
    const response = await Product.findByIdAndDelete(productId);
    return response;
  }  catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } 
   else if (error instanceof mongoose.Error.CastError) {
    throw ({message:"Invalid ID format",statusCode:500});
    }
    throw new internalServerError();
  }
}

async function getallProduct() {
  try {
    const products = await Product.find({});
    
    return products;
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } 
   else if (error instanceof mongoose.Error.CastError) {
    throw ({message:"Invalid product format",statusCode:500});
    }
    throw new internalServerError();
  }
}


async function findProductAndUpdate(productId, productDetails) {
  try {
   
    const newProduct = await Product.findByIdAndUpdate(productId, productDetails, { new: true });
    return newProduct;
  } catch (error) {
    console.log(error)
    if (error.name === "ValidationError") {
      const errorMessageList = Object.keys(error.errors).map((property) => {
        return error.errors[property].message;
      });
      throw new BadRequestError(errorMessageList);
    } else if (error instanceof mongoose.Error.CastError) {
      throw { message: "Invalid product format", statusCode: 400 };  
    }
    throw new InternalServerError();  
  }
}



module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  getallProduct, findProductAndUpdate
};
