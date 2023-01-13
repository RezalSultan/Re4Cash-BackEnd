// // akan menampung semua API yang kita buat
const express = require('express');
const usersRoutes = require("./users")

const app = express();

const API = "/api/v1";

app.use(API, usersRoutes);

module.exports = app;