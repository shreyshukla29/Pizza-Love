const express = require("express");
const userRouter = require("./routers/user.route");
const cartRouter = require("./routers/cart.routes");
const connectDB = require("../config/dbConfig");
const app = express(); //server object
const ServerConfig = require("../config/serverConfig");
const User = require("./schema/user.schema");
const authRouter = require("./routers/auth.route");

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter); //connects the router to server
app.use("/carts", cartRouter); // connects the cart router to server
app.use("/auth", authRouter);
app.post("/hello", (req, res) => {
  console.log(req.body);
  return res.json({ message: "recieved" });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${ServerConfig.PORT}...`);
});
