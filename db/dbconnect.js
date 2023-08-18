const{connect} = require("mongoose");

const connection = ()=>{
    connect(process.env.DB_URL,{
        useUnifiedTopology:true,
            useNewUrlParser:true
    }).then(()=>{console.log("DB connected!!")}).catch((err)=>{
        console.log(err.message);
    });
}
module.exports =connection;