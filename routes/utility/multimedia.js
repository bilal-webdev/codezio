const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/uploads');
    },
    filename: function(req, file, cb){
        let modifiedName = `codezio-${Date.now()+path.extname(file.originalname)}`;
        cb(null, modifiedName);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        let filetypes = /png|jpg|jpeg|gif|svg/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if(mimetype && extname) return cb(null, true);
        cb(`Only these ${filetypes} are accepted`);
    }
});

module.exports = upload;