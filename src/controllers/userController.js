const catchAsyncError = require("../utils/catchAsyncError");
const cloudinary = require("cloudinary");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const uploadCloudinary = require("../utils/cloudinary");

//Register User

const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  if (!(name || email || password || avatar)) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new ErrorHandler("User is already exist ", 400));
  }

  const response = await uploadCloudinary(avatar, "avatar");
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: response.public_id,
      url: response.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Account Created Successfully",
    user,
    token: user.getJWTToken(),
  });
});

//Login User

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 500));
  }

  const user = await User.findOne({ email }).select("+password");

  console.log("user", user);
  if (!user) {
    return next(new ErrorHandler("Invaid Credentials", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log("isPasswordMatched", isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invaid Credentials", 400));
  }

  res.status(200).json({
    success: true,
    message: `Login Successfully`,
    user,
    token: user.getJWTToken(),
  });
});

//Get All Users

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    users,
  });
});

module.exports = {
  register,
  login,
  getAllUsers,
};
