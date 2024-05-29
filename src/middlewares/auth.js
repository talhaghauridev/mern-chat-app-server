const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

const cacheUser = new Map();

exports.isAuthentication = catchAsyncError(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(
      new ErrorHandler("Please Login to access these resources ", 401)
    );
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return next(
      new ErrorHandler("Please Login to access these resources ", 401)
    );
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const isCacheUser = cacheUser.get(decodedData.id);
    if (isCacheUser) {
      req.user = isCacheUser;
      return next();
    }
    const user = await User.findById(decodedData.id);
    if (!user) {
      return next(
        new ErrorHandler("Please login to access these resources ", 401)
      );
    }
    cacheUser.set(user.id, user);
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token. Please log in again.", 401));
  }
});

exports.socketAuthenticator = catchAsyncError(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const isCacheUser = cacheUser.get(decodedData.id);
    if (isCacheUser) {
      socket.user = isCacheUser;
      return next();
    }
    const user = await User.findById(decodedData.id);
    if (!user) {
      return next(new ErrorHandler("Please login to access this route", 401));
    }
    cacheUser.set(user.id, user);
    socket.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return next(new ErrorHandler("Authentication error", 401));
  }
});
