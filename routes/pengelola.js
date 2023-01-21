const express = require("express");
const router = express();

const {verifyTokenUsers, verifyTokenPengelola} = require("../middleware/verifyToken")
const {getAllPengelola, registerPengelola, updateProfilePengelola, updateAlamatPengelola} = require("../controller/pengelolaController")
const {uploadPhotoPengelola,validationPhotoPengelola, deletePhotoPengelola} = require("../controller/multerPengelolaController");
const upload = require("../middleware/multerPengelola");

router.get("/pengelola", verifyTokenPengelola, getAllPengelola)
router.post("/pengelola", verifyTokenUsers, registerPengelola)
router.post('/images-pengelola', verifyTokenPengelola, upload, [validationPhotoPengelola, uploadPhotoPengelola])
router.patch('/pengelola', verifyTokenPengelola, updateProfilePengelola)
router.patch('/pengelola-alamat', verifyTokenPengelola, updateAlamatPengelola)
router.delete("/images-pengelola", verifyTokenPengelola, deletePhotoPengelola)

module.exports = router;