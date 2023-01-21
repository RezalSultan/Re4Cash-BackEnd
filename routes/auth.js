const express = require("express");
const router = express();

const {login, logout, logoutPengelola} = require("../controller/authController")
const {verifyTokenUsers, verifyTokenPengelola} = require("../middleware/verifyToken")

router.post('/login', login)
router.delete("/logout",verifyTokenUsers, logout)
router.delete("/logout-pengelola", verifyTokenPengelola, logoutPengelola)

module.exports = router;