// khusus membuat routes nya / HTTP Methods
const express = require("express");
const router = express();

const {getAllUsers, updateUser, register, login, logout} = require("../controller/usersController")
// const {loginPengelola} = require("../controller/pengelolaController")
const {verifyTokenUsers} = require("../middleware/verifyToken")
const {uploadPhotoUsers,validationPhotoUsers, deletePhotoUsers} = require("../controller/multerUsersController");
const upload = require("../middleware/multerUsers");

// READ - method get
router.get("/users", verifyTokenUsers, getAllUsers)

// CREATE - method POST 
router.post("/users", register)

router.post('/login', login)

router.post('/images', verifyTokenUsers, upload, [validationPhotoUsers, uploadPhotoUsers])

// CREATE - method PATCH, menggunakan params untuk mendapatkan path/router yang spesifik menggunakan titik 2
router.patch('/users', verifyTokenUsers, updateUser)



// DELETE - method DELETE
router.delete("/logout",verifyTokenUsers, logout)

router.delete("/images", verifyTokenUsers, deletePhotoUsers)

module.exports = router;