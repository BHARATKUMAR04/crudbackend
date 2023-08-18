const express = require('express');
const uRouter = express.Router();
const upload = require("../multerconfig/multerconn.js");
const controllers  =require("../controllers/crudControllers.js");
uRouter.post('/user/register',upload.single("user_profile"),controllers.createUser);
uRouter.get("/users",controllers.getUsers);
uRouter.get("/user/:id",controllers.getUser);
uRouter.post('/user/register/:id',upload.single("user_profile"),controllers.updateUser);
uRouter.delete("/user/:id",controllers.deleteUser);
uRouter.put("/user/status/:id",controllers.updateStatus);
uRouter.get("/userexport",controllers.userExport);
module.exports =uRouter