const express = require("express");
const router = express();
const { lihatProductPencarian, lihatProductPencarianById, tambahProductPencarian, updateProductPencarian, hapusProductPencarian } = require("../controller/productPencarianController");
const { verifyTokenPengelola } = require("../middleware/verifyToken");

router.get("/product-pencarian-semua", lihatProductPencarian)
router.get("/product-pencarian", verifyTokenPengelola, lihatProductPencarianById)
router.post("/product-pencarian", verifyTokenPengelola, tambahProductPencarian)
router.patch("/product-pencarian/:idProduct", verifyTokenPengelola, updateProductPencarian)
router.delete("/product-pencarian/:idProduct", verifyTokenPengelola, hapusProductPencarian)

module.exports = router;