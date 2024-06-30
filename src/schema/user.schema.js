const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
      minlength: [4, "firstname must be atleast 5 character long"],
      lowercase: true,
      trim: true,
      maxlength: [
        20,
        "First name should be less than or equal to 20 character",
      ],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
      
      minlength: [5, "firstname must be atleast 5 character long"],
      lowercase: true,
      trim: true,
      maxlength: [
        20,
        "First name should be less than or equal to 20 character",
      ],
    },
    mobileNumber: {
      type: String,
      trim: true,
      unique: [true, "Phone number already exist"],
      required: [true, "Phone number should be added"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email should be provided"],
      unique: [true, "email already exist"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      required: true,
      type: String,
      minlength: [10, "password should be  10 character long"],
      maxlength: [10, "password should be  10 character long"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true, version: false }
);

userSchema.pre("save", async function () {
  // here we modify the user before it is saved in mongoDB

  console.log("executing pre save hook");
  console.log(this);

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  console.log(this);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
