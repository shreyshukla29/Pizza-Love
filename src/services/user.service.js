const UserRepository = require("../Repository/user.repository");
const {createCart}=require('../Repository/cart.repository')
const NotFoundError = require("../utils/notFoundError");
const alreadyExist = require('../utils/alreadyExist')
const BadRequestError = require("../utils/BadRequest");
const AppError = require("../utils/appError");
const internalServerError = require('../utils/notFoundError')
class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async registerUser(userDetails) {
    // it will create new user in database
    // 1. need to check if user with email and mobile no already
    
      const userwithemail = await this.UserRepository.findUser({
        email: userDetails.email,
        
      });
  
      const userwithmobileNumber = await this.UserRepository.findUser({
        
        mobileNumber: userDetails.mobileNumber,
      });
  
     
      if (userwithemail) {
        throw new alreadyExist('user with email')
      }
  
      if (userwithmobileNumber) {
        throw new alreadyExist('user with mobile number')
      }   
      const newUser = await this.UserRepository.createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        mobileNumber: userDetails.mobileNumber,
      });
  
    
  
      if (!newUser) {
        throw new internalServerError();
      }
      await createCart(newUser._id);
      return newUser;  
}

}

module.exports = UserService;
