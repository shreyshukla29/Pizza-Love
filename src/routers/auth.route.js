const express = require("express");
const { login , logout ,regenerateToken } = require("../controllers/auth.controller");
const {isLoggedIn,checkInvalidToken} = require('../validation/auth.validator')
const authRouter = express.Router(); // Router property in express
authRouter.post("/login", login);
authRouter.post('/logout',isLoggedIn ,logout);
authRouter.post('/referesh/login' , checkInvalidToken, regenerateToken);
module.exports = authRouter;


