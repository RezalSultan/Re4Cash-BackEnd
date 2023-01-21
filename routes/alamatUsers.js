const express = require("express");
const router = express();
const {verifyTokenUsers} = require('../middleware/verifyToken')
const {tampilAlamatUsers, tampilAlamatUsersById, tambahAlamatUsers, editAlamatUsers, hapusAlamatUsers } = require("../controller/alamatUsersController")

router.get("/alamat-user", verifyTokenUsers, tampilAlamatUsers)
router.get("/alamat-user-by-id",verifyTokenUsers, tampilAlamatUsersById)
router.post("/alamat-user", verifyTokenUsers, tambahAlamatUsers)
router.patch("/alamat-user/:idAlamatUser", verifyTokenUsers, editAlamatUsers)
router.delete("/alamat-user/:idAlamatUser", verifyTokenUsers, hapusAlamatUsers)

module.exports = router;