const multer = require("multer")

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/images/pengelola")
   },
   filename: (req, file, cb) => {
      const timeStamp = new Date().getTime()
      const fileName = file.originalname

      cb(null, `pengelola-${timeStamp}-${fileName}`)
   }
})

const upload = multer({
   storage: storage,
   limits: {
      fileSize: 5 * 1000 * 1000, //5mb
   },
   fileFilter: (_, file, cb) => {
      if (
         file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" 
      ) {
         return cb(null, true);
      }

      return cb(new Error("Only accept .png, .jpg, jpeg are allowed"), false);
   },
}).single("photo");

module.exports = upload;