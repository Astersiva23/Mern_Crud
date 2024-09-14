import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";
import fileUpload from 'express-fileupload';  // Add this line


const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config(); 

app.use(fileUpload({ 
   useTempFiles: true,
   tempFileDir: '/tmp/'
 }));
 

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
         .then(()=>{
            console.log("DB Connected successfully.")
            app.listen(PORT,()=>{
             console.log(`Server is Running on the port : ${PORT}`)
        })
         }) 
         .catch((error) => console.log(error))

         app.use("/api", route);


