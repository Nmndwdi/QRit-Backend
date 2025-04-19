const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

// IMPORTS FROM FILES
const authRouter=require("./routes/auth");
const itemRouter=require('./routes/item');

// INIT
// const databaseURL = process.env.DB_URL;
const databaseURL = "mongodb+srv://naman_dwivedi:Nmndwdi1001@cluster0.ed9wjt6.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4000;
const app=express();
const DB = databaseURL;

// MIDDLEWARE
app.use(
    cors({
      origin: 'https://qrit.vercel.app',
      credentials: true,
    })
  );

app.use(express.json());
app.use(authRouter);
app.use(itemRouter);

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
});

app.listen(PORT,()=>{
    console.log(`connected at port ${PORT}`);
});

app.use("/",(req,res)=>{
    res.json("Hello World");
});
