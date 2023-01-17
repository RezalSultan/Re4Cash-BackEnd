// // akan menampung semua API yang kita buat
const express = require('express');
const usersRoutes = require("./users")
const alamatUsers = require("./alamatUsers")
const artikelRoutes = require("./artikel")

const app = express();

const API = "/api/v1";

app.use(API, [usersRoutes, alamatUsers, artikelRoutes]);

module.exports = app;