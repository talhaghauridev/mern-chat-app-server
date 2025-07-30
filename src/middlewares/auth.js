import jwt from "jsonwebtoken";
import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

const cacheUser = new Map();

export const isAuthentication = catchAsyncError(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new ErrorHandler("Please Login to access these resources ", 401));
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("Please Login to access these resources ", 401));
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
      return next(new ErrorHandler("Please login to access these resources ", 401));
    }
    cacheUser.set(user.id, user);
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token. Please log in again.", 401));
  }
});

export const socketAuthenticator = catchAsyncError(async (socket, next) => {
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
