const express = require("express");
const router = express();

const {verifyTokenUsers, verifyTokenPengelola} = require("../middleware/verifyToken")
const {getAllPengelola, registerPengelola} = require("../controller/pengelolaController")

router.get("/pengelola", verifyTokenPengelola, getAllPengelola)
router.post("/pengelola", verifyTokenUsers, registerPengelola)

module.exports = router;