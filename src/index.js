const app = require("./app.js");
const { createServer } = require("http");
const cloudinary = require("cloudinary");
const { Server } = require("socket.io");
const connectDB = require("./db/index.js");
const socket = require("./socket.js");
const { cloudinayConfig, corsConfig } = require("./config/index.js");

connectDB();
cloudinary.config(cloudinayConfig);
const PORT = process.env.PORT | 5500;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running fine",
  });
});
const server = createServer(app);
const io = new Server(server, corsConfig);

socket(io);

server.listen(PORT, () => {
  console.log(`Server is running on Port: http://localhost:${PORT}`);
});
