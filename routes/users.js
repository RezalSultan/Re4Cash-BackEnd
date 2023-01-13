// khusus membuat routes nya / HTTP Methods
const express = require("express");
const router = express();

const UserController = require("../controller/usersController")
const middlewareVerifyToken = require("../middleware/verifyToken")
const refeshTokenController = require("../controller/refreshToken")

// READ - method get
router.get("/users", middlewareVerifyToken, UserController.getAllUsers)

router.get("/token", refeshTokenController.refreshToken)

// CREATE - method POST 
router.post("/users", UserController.register)

router.post('/login', UserController.login)

// CREATE - method PATCH, menggunakan params untuk mendapatkan path/router yang spesifik menggunakan titik 2
router.patch('/users/:id', UserController.updateUser)



// DELETE - method DELETE
router.delete("/users/:id", UserController.deleteUser)

router.delete("/logout", UserController.logout)

module.exports = router;