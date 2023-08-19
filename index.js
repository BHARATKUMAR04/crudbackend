const express = require('express')
require('dotenv').config();
const cors = require("cors");
const connectionDB  = require('./db/dbconnect.js');
const app = express();
const path = require("path");
const uRouter = require('./routes/userR.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use('/uploads',express.static("./uploads"));
app.use('/files',express.static("./public/files"));
//static files
app.use(express.static(path.join(__dirname,'../client/build')));
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
})
app.use(uRouter);

connectionDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is running on port:${PORT}`)
    })
})

