import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

const corsConfig = {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
};

const bodyParserConfig = {
  limit: "50mb",
};

export { cloudinaryConfig, corsConfig, bodyParserConfig };
