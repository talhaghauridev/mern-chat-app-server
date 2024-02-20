const cloudinayConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
};


const corsConfig = {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  };

module.exports = {
  cloudinayConfig,
  corsConfig
};
