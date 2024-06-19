const multer = require("multer");

const cloudinary = require("../../config/cloudinary.config");
const {
  createProduct,
  getProduct,
  deleteProduct,
} = require("../Repository/product.repository");
const internalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");
const fs = require("fs");

async function productCreate(productDetails) {
  // 1. we should check if an image is coming to create the rpoduct , then we should first upload it on cloudinary,

  const imagepath = productDetails.productImage;


  if (imagepath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagepath);
      console.log("image : ", imagepath);
      await fs.unlink(imagepath, function (err) {
        if (err) return console.log("error", err);
        console.log("file deleted successfully");
      });

      var prdouctUrl = cloudinaryResponse.secure_url;
    } catch (error) {
      throw new internalServerError();
    }
  }


  const product = createProduct({
    ...productDetails,
    productImage: prdouctUrl,
  });

  return product;

  //2 .then use the url from clodinary and either product details to add product in db
}

async function findProduct(id) {
  const productID = id;

  const product = await getProduct(productID);

  if (!product) {
    throw new NotFoundError("Product");
  }

  return product;
}

async function productDelete(id) {
  const productId = id;

try {
  const Product = await findProduct(id);
  if (!Product) {
    throw new NotFoundError("Product");
  }

  const imageurl = Product.productImage;
  const parsedUrl = url.parse(imageUrl);
  const pathname = parsedUrl.pathname.split('/');
  const filename = pathname[pathname.length - 1];
  const publicId = filename.split('.')[0]; // Assuming the file has an extension
  const result = await cloudinary.uploader.destroy(publicId);

  await deleteProduct(productId);

  return Product;
} catch (error) {
  throw internalServerError();
}


}
module.exports = {
  productCreate,
  findProduct,
  productDelete,
};
