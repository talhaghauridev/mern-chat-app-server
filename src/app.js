const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddlewares = require("./middlewares/error");

const app = express();

dotenv.config({ path: "./.env" });

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());

//Routes Import

const user = require("./routes/userRoute");
const chat = require("./routes/chatRoute");
const message = require("./routes/messageRoute");

app.use("/api/v1/user", user);
app.use("/api/v1/chat", chat);
app.use("/api/v1/message", message);

//Error middleware
app.use(errorMiddlewares);

module.exports = app;
