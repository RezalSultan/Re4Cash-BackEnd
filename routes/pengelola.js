const express = require("express");
const router = express();

const {verifyTokenUsers, verifyTokenPengelola} = require("../middleware/verifyToken")
const {getAllPengelola, registerPengelola, updateProfilePengelola, updateAlamatPengelola, getPengelolaById} = require("../controller/pengelolaController")
const {uploadPhotoPengelola,validationPhotoPengelola, deletePhotoPengelola, updatePhotoPengelola} = require("../controller/multerPengelolaController");
const upload = require("../middleware/multerPengelola");

router.get("/pengelola", verifyTokenPengelola, getAllPengelola)
router.get("/pengelola-by-id", verifyTokenPengelola, getPengelolaById)
router.post("/pengelola", verifyTokenUsers, registerPengelola)
router.post('/images-pengelola', verifyTokenPengelola, upload, [validationPhotoPengelola, uploadPhotoPengelola])
router.patch('/images-pengelola', verifyTokenPengelola, upload, [validationPhotoPengelola, updatePhotoPengelola])
router.patch('/pengelola', verifyTokenPengelola, updateProfilePengelola)
router.patch('/pengelola-alamat', verifyTokenPengelola, updateAlamatPengelola)
router.delete("/images-pengelola", verifyTokenPengelola, deletePhotoPengelola)

module.exports = router;