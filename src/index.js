const app = require("./app.js");
const { createServer } = require("http");
const cloudinary = require("cloudinary");
const { Server } = require("socket.io");
const connectDB = require("./db/index.js");
const socket = require("./socket.js");

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
const PORT = process.env.PORT | 5500;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running fine",
  });
});
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socket(io);

if (!server.listening) {
  server.listen(PORT, () => {
    console.log(`Server is running on Port: http://localhost:${PORT}`);
  });
}

module.exports = server;
