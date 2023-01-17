const express = require("express");
const router = express();

const alamatUsersController = require("../controller/alamatUsersController")

router.get("/alamat-user", alamatUsersController.tampilAlamatUsers)
router.get("/alamat-user/:idParams", alamatUsersController.tampilAlamatUsersById)
router.post("/alamat-user", alamatUsersController.tambahAlamatUsers)
router.patch("/alamat-user/:idAlamatUser", alamatUsersController.editAlamatUsers)
router.delete("/alamat-user/:idAlamatUser", alamatUsersController.hapusAlamatUsers)

module.exports = router;