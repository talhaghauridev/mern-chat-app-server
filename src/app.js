import express from "express";
import dotenv from "dotenv";
import errorMiddlewares from "./middlewares/error.js";
import { corsConfig, bodyParserConfig } from "./config/index.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

dotenv.config({ path: "./.env" });

app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json(bodyParserConfig));

// Routes Import
import user from "./routes/userRoute.js";
import chat from "./routes/chatRoute.js";
import message from "./routes/messageRoute.js";

app.use("/api/v1/user", user);
app.use("/api/v1/chat", chat);
app.use("/api/v1/message", message);

//Error middleware
app.use(errorMiddlewares);

export default app;
