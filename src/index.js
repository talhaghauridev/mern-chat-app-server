import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db/index.js";
import socket from "./socket.js";
import { corsConfig } from "./config/index.js";
import { socketAuthenticator } from "./middlewares/auth.js";
import userModel from "./models/userModel.js";
const PORT = process.env.PORT | 5500;

app.get("/", async (req, res) => {
  const users = await userModel.find();
  console.log({ users });
  res.status(200).json({
    success: true,
    message: "Server is running fine",
  });
});

const server = createServer(app);
const io = new Server(server, corsConfig);

io.use(socketAuthenticator);
socket(io);

connectDB()
  .then(() =>
    server.listen(PORT, () => {
      console.log(`Server is running on Port: http://localhost:${PORT}`);
    })
  )
  .catch((error) => process.exit(1));
