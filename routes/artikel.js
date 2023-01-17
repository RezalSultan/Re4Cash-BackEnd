const express = require("express");
const router = express();

const artikelController = require("../controller/artikelController")

router.get("/artikel", artikelController.tampilArtikel)

module.exports = router