const express = require("express");
const router = express();
const { tambahProductPenjualan, lihatProductPenjualan, lihatProductPenjualanById, updateProductPenjualan, hapusProductPenjualan } = require("../controller/productPenjualanController");
const { verifyTokenPengelola } = require("../middleware/verifyToken");

router.get("/product-penjualan-semua", lihatProductPenjualan)
router.get("/product-penjualan", verifyTokenPengelola, lihatProductPenjualanById)
router.post("/product-penjualan", verifyTokenPengelola, tambahProductPenjualan)
router.patch("/product-penjualan/:idProduct", verifyTokenPengelola, updateProductPenjualan)
router.delete("/product-penjualan/:idProduct", verifyTokenPengelola, hapusProductPenjualan)

module.exports = router;