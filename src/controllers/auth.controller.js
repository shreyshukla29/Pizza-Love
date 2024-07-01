const { loginUser , refereshtoken } = require("../services/auth.service");
const AppError = require('../utils/appError')
const mongoose = require('mongoose')
const  ServerConfig = require("../../config/serverConfig");
async function login(req, res) {
  const loginPayload = req.body;


  try {
    const response = await loginUser(loginPayload);
    console.log("resp",response);

    res.cookie("authToken", response.token, {
      httpOnly: true,
      secure: ServerConfig.PRODUCTION, // Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });
    

    return res
      .status(200)
      .json({ success: true, message: "Login successful", data: { userRole: response.userRole, userDetail: response.userDetail }, error: {} });
  } catch (error) {
    if (error instanceof AppError || error instanceof mongoose.Error.CastError) {
      return res.status(error.statusCode || 400).json({
        success: false,
        message: error.message,
        error: error,
        data: {},
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
      data: {},
    });
  }
}


async function logout(req, res) {

  console.log('hit')
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: ServerConfig.PRODUCTION, // Set to true in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'None'
  });

  console.log("resp return")

  return res.status(200).json({
    success: true,
    message: "Log out successfull",
    error: {},
    data: {},
  });
}




async function regenerateToken(req ,res){

  const payload = req.user;
  console.log('refreshing token')

  try {
    const response = await refereshtoken(payload);
    console.log("token regenerate",response);
    res.cookie("authToken", response.token, {
      httpOnly: true,
      secure: ServerConfig.PRODUCTION, // Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'None'
    });

    return res.status(200).json({
      message : "token refresh successfully",
      data : {},
      error :{},
      success :true,
    })
    
  } catch (error) {
    return res.status(404).json({
      message : 'no a valid token',
      data:{},
      error:{error},
      success:false
    })
    
  }





}


module.exports = { login, logout,regenerateToken };
