import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import router from "./routes/userroute.js"
import cors from "cors"
import cookieParser from 'cookie-parser';
import messageRoute from "./routes/messageroute.js"
import { app, server } from "./SocketIO/server.js";
dotenv.config();

app.use(cookieParser());
const Port=process.env.port || 3000;
const mongourl=process.env.Url;
app.use(cors({
    origin: "https://chatapp-3y9e.vercel.app/",  // your frontend URL
    credentials: true                 // allow cookies to be sent
  }));

try {
    mongoose.connect(mongourl);
    console.log("mongodb connected successfully");
} catch (error) {
    console.log(error);
    console.log("error connecting to mongodb");
}

app.use(express.json());
app.use("/user",router);
app.use("/message", messageRoute);

server.listen(Port,()=>{
    console.log(`app is running at port ${Port}`);
});
