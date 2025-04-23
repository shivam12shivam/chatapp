import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import router from "./routes/userroute.js"
import cors from "cors"
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(cookieParser());
const Port=process.env.port || 3001;
const mongourl=process.env.Url;
app.use(cors({
    origin: "http://localhost:5173",  // your frontend URL
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

app.listen(Port,()=>{
    console.log(`app is running at port ${Port}`);
});
