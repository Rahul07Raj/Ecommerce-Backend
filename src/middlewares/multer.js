const multer = require("multer");
const uuid = require("uuid");
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null,"uploads");
  },
  filename(req,file,callback){
    const id =uuid.v4();
    const extName = file.originalname.split(".").pop();
    callback(null,`${id}.${extName}`);
  }
});

exports.singleUpload = multer({ storage }).single("photo");
