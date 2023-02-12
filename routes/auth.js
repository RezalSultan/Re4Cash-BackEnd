const express = require("express");
const router = express();

const {login, logout, switchToPengelola} = require("../controller/authController")
const {verifyTokenUsers, verifyTokenPengelola} = require("../middleware/verifyToken")

router.post('/login', login)
router.post('/switch-to-pengelola',verifyTokenUsers, switchToPengelola)
router.delete("/logout",verifyTokenUsers, logout)

module.exports = router;