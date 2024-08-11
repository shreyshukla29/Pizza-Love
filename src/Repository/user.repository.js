const User = require("../schema/user.schema");
const mongoose=require('mongoose')
const internalServerError = require("../utils/internalServerError");
const BadRequestError = require("../utils/BadRequest");
class UserRepository {
  async findUser(parameter) {
    try {
      const response = await User.findOne({ ...parameter });     
      return response;
    }  catch (error) {
      if (error.name === "ValidationError") {
        const errorMessageList = Object.keys(error.errors).map((property) => {
          return error.errors[property].message;
        });
        throw new BadRequestError(errorMessageList);
      } 
     else if (error instanceof mongoose.Error.CastError) {
      throw ({message:"Invalid user details  format",statusCode:500});
      }
      throw new internalServerError();
    }
  }

  async findUserbyId(userId){
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      if (error.name === "ValidationError") {
        const errorMessageList = Object.keys(error.errors).map((property) => {
          return error.errors[property].message;
        });
        throw new BadRequestError(errorMessageList);
      } 
     else if (error instanceof mongoose.Error.CastError) {
      throw ({message:"Invalid user details  format",statusCode:500});
      }
      throw new internalServerError();
    }
  }

  async createUser(userDetails) {
    try {
      const response = await User.create({ ...userDetails });
      return response;
    } catch (error) {
      console.log(error)
      if (error.name === "ValidationError") {
        const errorMessageList = Object.keys(error.errors).map((property) => {
          return error.errors[property].message;
        });
        throw new BadRequestError(errorMessageList);
      } 
     else if (error instanceof mongoose.Error.CastError) {
        throw ({message:"Invalid user details  format",statusCode:500});
      }
      throw new internalServerError();
    }
  }
}

module.exports = UserRepository;
