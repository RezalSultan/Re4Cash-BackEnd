const multer = require("multer")

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "public/images/product_pencarian")
   },
   filename: (req, file, cb) => {
      const timeStamp = new Date().getTime()
      const fileName = file.originalname

      cb(null, `produkPencarian-${timeStamp}-${fileName}`)
   }
})

const upload = multer({
   storage: storage,
   limits: {
      fileSize: 10 * 1000 * 1000, //10mb
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