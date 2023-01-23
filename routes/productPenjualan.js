const express = require("express");
const router = express();
const { tambahProductPenjualan, lihatProductPenjualan, lihatProductPenjualanById, updateProductPenjualan, hapusProductPenjualan } = require("../controller/productPenjualanController");
const { verifyTokenPengelola } = require("../middleware/verifyToken");

router.get("/product-penjualan", lihatProductPenjualan)
router.get("/product-penjualan/:productId", verifyTokenPengelola, lihatProductPenjualanById)
router.post("/product-penjualan", verifyTokenPengelola, tambahProductPenjualan)
router.patch("/product-penjualan/:productId", verifyTokenPengelola, updateProductPenjualan)
router.delete("/product-penjualan/:productId", verifyTokenPengelola, hapusProductPenjualan)

module.exports = router;