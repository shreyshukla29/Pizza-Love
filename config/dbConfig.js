const mongoose = require("mongoose");
const ServerConfig = require("./serverConfig");
async function connectDB() {
  try {
    await mongoose.connect(ServerConfig.DB_URL);
    console.log("Hurray! connected to mongoDB...");
  } catch (error) {
    console.log({ message: "Not able to connet mongoDB", error: error });
  }
}

module.exports = connectDB;
