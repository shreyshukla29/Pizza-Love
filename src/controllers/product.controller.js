const { productCreate } = require("../services/product.service");

async function addProduct(req, res) {
  console.log(res);

  try {
  
  const product = await productCreate({
      productName: req.body.productName,
      description: req.body.description,
      productImage: req.file.path,
      productPrice: req.body.productPrice,
      Category: req.body.Category,
      InStock: req.body.InStock,
    });
    return res.status(201).json({ message: "product add successfully" });
  } catch (error) {
    return res.json(error.message).status(error.status);
  }
}

module.exports = { addProduct };
