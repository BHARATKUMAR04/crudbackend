const multer  = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,callfn)=>{
        callfn(null,'./uploads')
    },
    filename:(req,file,callfn)=>{
        const fileName = `images-${Date.now()}.${file.originalname}`
        callfn(null,fileName)
    }
});
const filefilter = (req,file,callfn)=>{
    if(file.mimetype==='image/png'|| file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg'){
        callfn(null,true)
    }
    else{
        callfn(null,false)
        return callfn(new Error("only jpg jpeg png formatted allow"));
    }
}
const upload  = multer({
    storage:storage,
    fileFilter:filefilter
});
module.exports = upload;