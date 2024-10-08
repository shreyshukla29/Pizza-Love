const dotenv = require("dotenv");
dotenv.config();

// exporting all the environment variable
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  Frontend_URL: process.env.Frontend_URL,
  PRODUCTION: process.env.PRODUCTION,
  RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY,
  RAZORPAY_API_SECRET: process.env.RAZORPAY_API_SECRET,
  WORKSPACE_KEY : process.env.WORKSPACE_KEY,
  WORKSPACE_SECRET : process.env.WORKSPACE_SECRET
};
