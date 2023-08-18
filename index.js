const express = require('express')
require('dotenv').config();
const cors = require("cors");
const connection  = require('./db/dbconnect.js');
const app = express();
const uRouter = require('./routes/userR.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
connection();
app.use('/uploads',express.static("./uploads"));
app.use('/files',express.static("./public/files"));
app.use(uRouter);

app.listen(process.env.Port ,()=>{
    console.log(`app is running on port:${process.env.Port}`)
})
