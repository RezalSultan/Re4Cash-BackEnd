// khusus membuat routes nya / HTTP Methods
const express = require("express");
const router = express();

const UserController = require("../controller/usersController")
const middlewareVerifyToken = require("../middleware/verifyToken")
const refeshTokenController = require("../controller/refreshToken")
const {uploadPhotoUsers, deletePhotoUsers} = require("../controller/multerUsersController");
const upload = require("../middleware/multerUsers");

// READ - method get
router.get("/users", middlewareVerifyToken, UserController.getAllUsers)

router.get("/token", refeshTokenController.refreshToken)

// CREATE - method POST 
router.post("/users", UserController.register)

router.post('/login', UserController.login)

router.post('/images/:id_user', upload, uploadPhotoUsers)

// CREATE - method PATCH, menggunakan params untuk mendapatkan path/router yang spesifik menggunakan titik 2
router.patch('/users/:id_user', UserController.updateUser)



// DELETE - method DELETE
router.delete("/logout", UserController.logout)

router.delete("/images/:id_user", deletePhotoUsers)

module.exports = router;