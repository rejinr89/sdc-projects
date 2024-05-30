//require
const express = require("express");
const mongoose=require('mongoose');
const studentRouter=require('./routes/studentRouter');
require("dotenv").config();

//creating express app
const app = new express();

//environment variables
const PORT=process.env.PORT;
const MONGO_URI=process.env.MONGO_URI;

//middlewares
app.use("/api/students",studentRouter);

//connecting to db
try {
    mongoose.connect(MONGO_URI).then(()=>{
        console.log('Connected with the db');
        //server listening
        app.listen(process.env.PORT, () => {
          console.log("Server listening on port" + process.env.PORT);
        });
    })
} catch (error) {
    console.log('DB Connection error'+error);
}
