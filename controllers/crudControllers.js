const crudUser = require("../models/crudscema.js");
const fs = require("fs");
const csStream = require('fast-csv');

exports.createUser = async (req, res) => {
    const file = req.file.filename;
    try {
        const { email } = req.body;
        const preUser = await crudUser.findOne({ email: email });
        if (preUser) {
            res.status(403).json({ msg: "User is already Registerd!!" });
        }
        const user = new crudUser({ ...req.body, file: file });

        await user.save();
        res.status(201).json({ msg: "user created successfully!!", user });

    } catch (error) {
        res.status(500).json(error.message);
    }

};
exports.getUsers = async (req, res) => {
    const search = req.query.search ||"";
    const gender = req.query.gender ||"";
    const status = req.query.status ||"";
    const sort  = req.query.sort ||"";
    const page = req.query.page ||1;
    const item_per_page = 3;
    const skip  =(page-1)*item_per_page;

    console.log(req.query);

    const query = {
        name:{$regex:search,$options:"i"},
    }
    if(req.query.gender !=="All"){
        query.gender = gender;
    }
    if(req.query.status !=="All"){
        query.status = status;
    }
    try {
        const count  = await crudUser.countDocuments(query)
        const pagecount  =Math.ceil(count/item_per_page);
        const users = await crudUser.find(query)
        .sort({createdAt:sort==="new"?-1:1})
        .limit(item_per_page)
        .skip(skip);
        if (!users) {
            res.status(403).json({ msg: "There is no users" });
        }
        res.status(200).json({
            pagination:{count,pagecount},
            users
        });
    } catch (error) {
        res.status(500).json(error.message);
    }

};
exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await crudUser.findOne({ _id: id });
        if (!user) {
            res.status(403).json({ msg: "There is no users" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }

};
exports.updateUser = async (req, res) => {
    const file = req.file ? req.file.filename : req.body.user_profile;
    console.log("file:", file)
    const { id } = req.params;
    try {
        if (id) {
            const updatedUser = await crudUser.findByIdAndUpdate({ _id: id }, { ...req.body, file: file }, { new: true });
            console.log("updated U:", updatedUser);
            res.status(200).json(updatedUser);
        } else {
            res.status(401).json("there is no user with Id");
        }

        // res.status(201).json(updatedUser);

    } catch (error) {
        res.status(500).json(error.message);
    }

};
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await crudUser.findByIdAndDelete({ _id: id });
        if (!user) {
            res.status(403).json({ msg: "There is no users" });
        }
        res.status(200).json({ msg: `${user.name} deleted  Successfully!!`,user });
    } catch (error) {
        res.status(500).json(error.message);
    }

};
//update status
exports. updateStatus = async(req,res)=>{
    const{id} = req.params;
    const {status}= req.body
    console.log(status);
    try {
        const upStuser  =await crudUser.findByIdAndUpdate({_id:id},{status:status},{new:true});
        res.status(200).json(upStuser);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
//export csv
exports.userExport = async(req,res)=>{
    try {
        const users = await crudUser.find();

        const csvStream = csStream.format({headers:true});

        if(!fs.existsSync("public/files/export")){
             if(!fs.existsSync("public/files")){
                fs.mkdirSync("public/files");
             }
             if(!fs.existsSync("public/files/export")){
                   fs.mkdirSync("public/files/export")
             }
        }
        const writeStream  = fs.createWriteStream("public/files/export/users.csv");
        
        csvStream.pipe(writeStream);
        writeStream.on("finish",()=>{
            res.json({
                downloadUrl:`${process.env.BASE_URL}/files/export/users.csv`
            })
        });
        if(users.length>0){
            users.map((user)=>{
                csvStream.write({
                    "Name":user.name||"-",
                    "Email":user.email||"-",
                    "Mobile":user.phone||"-",
                    "Location":user.location||"-",
                    "Status":user.status||"-",
                    "Gender":user.gender||"-",
                    "Profile":user.file||"-",
                    "CreatedAt":user.createdAt||"-"
                })
            })
        }
        csvStream.end();
        writeStream.end();
    } catch (error) {
      res.status(500).json(error.message);  
    }
}