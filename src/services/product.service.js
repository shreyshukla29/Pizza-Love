const multer = require("multer");

const cloudinary = require("../../config/cloudinary.config");
const { createProduct } = require("../Repository/product.repository");
const fs = require("fs");

async function productCreate(productDetails) {
  // 1. we should check if an image is coming to create the rpoduct , then we should first upload it on cloudinary,

  const imagepath = productDetails.productImage;

  if (imagepath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagepath);
      await fs.unlink(imagepath, function (err) {
        if (err) return console.log(err);
        console.log("file deleted successfully");
      });

      var prdouctUrl = cloudinaryResponse.secure_url;
    } catch (error) {
      throw { message: "error from cloudinary", statusCode: 400 };
    }
  }

  const product = createProduct({
    ...productDetails,
    productImage: prdouctUrl,
  });

  if (!product) {
    throw { message: "not able to create product", statusCode: 400 };
  }

  //2 .then use the url from clodinary and either product details to add product in db
}

module.exports = {
  productCreate,
};
