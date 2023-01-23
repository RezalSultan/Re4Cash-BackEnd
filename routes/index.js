// // akan menampung semua API yang kita buat
const express = require('express');
const usersRoutes = require("./users")
const alamatUsers = require("./alamatUsers")
const artikelRoutes = require("./artikel")
const pengelolaRoutes = require("./pengelola")
const authRoutes = require("./auth")
const productPenjualanRoutes = require("./productPenjualan")
const productPencarianRoutes = require("./productPencarian")

const app = express();

const API = "/api/v1";

app.use(API, usersRoutes);
app.use(API, alamatUsers);
app.use(API, artikelRoutes);
app.use(API, pengelolaRoutes);
app.use(API, authRoutes);
app.use(API, productPenjualanRoutes);
app.use(API, productPencarianRoutes);

module.exports = app;