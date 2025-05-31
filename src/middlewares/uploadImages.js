const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file,cb){
        cb(null,"uploads/");
    },
    
    filename: function(req, file, cb){
        const ext = path.extname(file.originalname);
        const name = file.fieldname + '-' + Date.now() + ext;
        cb(null, name);
    }
}); 

const fileFilter = (req, file, cb) => {

    const allowed = /jpg|jpeg|png|gif/;
    const isValid = allowed.test(file.mimetype);
    
    if (isValid) {
        cb(null, true);
      } else {
        cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, gif)"));
      }
    };

    const upload = multer({storage, filefilter});

    module.exports = upload;