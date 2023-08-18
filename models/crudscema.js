const{Schema,model } = require('mongoose');

const crudSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

const crudUser = new model("cruduser" ,crudSchema);

module.exports = crudUser;
