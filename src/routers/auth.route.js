const express = require("express");
const { login , logout } = require("../controllers/auth.controller");
const authRouter = express.Router(); // Router property in express
authRouter.post("/login", login);
authRouter.post('/logout', logout);
module.exports = authRouter;
