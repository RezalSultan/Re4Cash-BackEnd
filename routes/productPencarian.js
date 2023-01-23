const express = require("express");
const router = express();
const { lihatProductPencarian, lihatProductPencarianById, tambahProductPencarian, updateProductPencarian, hapusProductPencarian } = require("../controller/productPencarianController");
const { verifyTokenPengelola } = require("../middleware/verifyToken");

router.get("/product-pencarian", lihatProductPencarian)
router.get("/product-pencarian/:productId", verifyTokenPengelola, lihatProductPencarianById)
router.post("/product-pencarian", verifyTokenPengelola, tambahProductPencarian)
router.patch("/product-pencarian/:productId", verifyTokenPengelola, updateProductPencarian)
router.delete("/product-pencarian/:productId", verifyTokenPengelola, hapusProductPencarian)

module.exports = router;