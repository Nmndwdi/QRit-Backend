const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

// IMPORTS FROM FILES
const authRouter=require("./routes/auth");
const itemRouter=require('./routes/item');

// INIT
const PORT = 4000;
const app=express();
const DB = "mongodb+srv://naman_dwivedi:Nmndwdi1001@cluster0.ed9wjt6.mongodb.net/?retryWrites=true&w=majority";

// MIDDLEWARE
app.options('*', cors())
app.use(
    cors ({
        origin:'*',
        credential:true,
        preflightContinue:true,
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

app.listen(PORT,"192.168.0.104",()=>{
    console.log(`connected at port ${PORT}`);
});

// app.get("/",(req,res)=>{
//     res.json("Hello World");
// });