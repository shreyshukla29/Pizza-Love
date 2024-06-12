// all routes for user

const { createUser } = require("../controllers/user.controller");
const express = require("express");

const userRouter = express.Router(); // Router property in express
userRouter.post("/create", createUser);

module.exports = userRouter;
