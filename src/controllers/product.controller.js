const {
  productCreate,
  findProduct,
  productDelete,
} = require("../services/product.service");

const AppError = require('../utils/appError')
async function addProduct(req, res) {
  

  try {
    const product = await productCreate({
      productName: req.body.productName,
      description: req.body.description,
      productImage: req.file?.path,
      productPrice: req.body.productPrice,
      Category: req.body.Category,
      InStock: req.body.InStock,
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully created the product',
      error: {},
      data: product
  });
  } catch (error) {

    if(error instanceof AppError){
      return res.json(error.message).status(error.status);

    }
    console.log(error)
    return res.json({
      success:false,
      message : 'Something went wrong',
      data : {},
      error : error,
    }).status(500);
    
  }
}

async function getProduct(req, res) {
  const id = req.params.id;
  try {
    const product = await findProduct(id);
    return res
      .status(201)
      .json({ message: "product is available", details: product });
  } catch (error) {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            data: {},
            error: error
        });
    }
    console.log(error);
    return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        data: {},
        error: error
    });
}
}

async function deleteProductById(req, res) {
  const id = req.params.id;
  try {
  const response =   await productDelete(id);

  return res.status(200).json({
    success: true,
    message: 'Successfully deleted the product',
    error: {},
    data: response
})
}catch (error) {
    if(error instanceof AppError) {
      return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          data: {},
          error: error
      });
  }
  console.log(error);
  return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: {},
      error: error
  });
}
}

module.exports = { addProduct, getProduct, deleteProductById };
