const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 100,
      trim: true,
    },

    productImage: {
      type: String,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    Category: {
      type: String,
      enum: ["veg", "non-veg", "drinks", "sides"],
      default: "veg",
    },
    InStock: {
      type: Boolean,
      required: [true, "In stock status is required"],
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
