const express = require("express");
const userRouter = require("./routers/user.route");
const cartRouter = require("./routers/cart.routes");
const connectDB = require("../config/dbConfig");
const app = express(); //server object
const ServerConfig = require("../config/serverConfig");
const User = require("./schema/user.schema");
const authRouter = require("./routers/auth.route");
const cookieParser = require("cookie-parser");
const { isLoggedIn } = require("./validation/auth.validator");
const multer = require("multer");
const uploader = require("./middlewares/multer.middleware");
const cloudinary = require("../config/cloudinary.config");
const orderRouter = require("./routers/order.routes");
const fs = require("fs");
const productRouter = require("./routers/product.router");
const cors = require("cors");
const mongoose = require("mongoose");
const paymentRouter = require("./routers/payment.route");

app.use(
  cors({
    origin: ServerConfig.Frontend_URL, // Replace with your Vercel app URL
    credentials: true, // Set to true if you need to allow cookies or other credentials
  })
);
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRouter); //connects the router to server
app.use("/carts", cartRouter); // connects the cart router to server
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.use("/orders", orderRouter);
app.use("/payment", paymentRouter);

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${ServerConfig.PORT}...`);
});
