const multer = require("multer");

const cloudinary = require("../../config/cloudinary.config");
const {
  createProduct,
  getProduct,
  deleteProduct,
  getallProduct,
  findProductAndUpdate,
} = require("../Repository/product.repository");
const NotFoundError = require("../utils/notFoundError");

const BadRequestError = require("../utils/BadRequest");
const AppError = require("../utils/appError");
const internalServerError = require("../utils/notFoundError");
const fs = require("fs");

async function productCreate(productDetails) {
  // 1. we should check if an image is coming to create the rpoduct , then we should first upload it on cloudinary,

  const imagepath = productDetails.productImage;
  console.log(imagepath);

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

    if (Product.Image) {
      const imageurl = Product.productImage;
      const parsedUrl = url.parse(imageUrl);
      const pathname = parsedUrl.pathname.split("/");
      const filename = pathname[pathname.length - 1];
      const publicId = filename.split(".")[0]; // Assuming the file has an extension
      const result = await cloudinary.uploader.destroy(publicId);
    }

    await deleteProduct(productId);
    return Product;
  } catch (error) {
    throw new internalServerError();
  }
}

async function findallProduct() {
  const products = await getallProduct();

  if (!products) {
    throw new NotFoundError("Products");
  }

  return products;
}

async function updateProduct(productId, productDetails) {
  const newproduct = await findProductAndUpdate(productId, productDetails);

  if (!newproduct) {
    throw new NotFoundError("Product");
  }

  return newproduct;
}

module.exports = {
  productCreate,
  findProduct,
  productDelete,
  findallProduct,
  updateProduct,
};
