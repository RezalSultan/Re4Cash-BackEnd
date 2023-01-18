const express = require("express");
const router = express();

const {verifyTokenUsers} = require("../middleware/verifyToken")
const {getAllPengelola, registerPengelola} = require("../controller/pengelolaController")

router.get("/pengelola", verifyTokenUsers, getAllPengelola)
router.post("/pengelola", verifyTokenUsers, registerPengelola)

module.exports = router;