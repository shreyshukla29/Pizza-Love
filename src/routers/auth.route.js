const express = require("express");
const { authcontroller } = require("../controllers/auth.controller");
const authRouter = express.Router(); // Router property in express
authRouter.post("/login", authcontroller);

module.exports = authRouter;
