const app = require("./app.js");
const http = require("http");
const cloudinary = require("cloudinary");
const { Server } = require("socket.io");
const connectDB = require("./db/index.js");
const {socket} = require("./socket.js");

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
const PORT = process.env.PORT | 5000;

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});



socket(io);


app.get("/",(req,res,next)=>{
  res.json({
    message:true,
    message:"App work correctely",
  })
})

server.listen(PORT, () => {
  console.log(`Server is runing is Port: http://localhost:${PORT}`);
});
