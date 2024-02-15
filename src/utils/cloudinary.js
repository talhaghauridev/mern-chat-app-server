const { v2 } = require("cloudinary");
const ErrorHandler = require("./errorHandler");
const uploadCloudinary = async (file, folder) => {
  try {
    const response = await v2.uploader.upload(file, {
      folder,
      resource_type: "auto",
    });

    if (!response) {
      throw new ErrorHandler("Upload image error", 400);
    }
    return response;
  } catch (error) {
    throw new ErrorHandler(error, 400);
  }
};

module.exports = uploadCloudinary;
