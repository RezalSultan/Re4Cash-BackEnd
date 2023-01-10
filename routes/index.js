// // akan menampung semua API yang kita buat
const express = require('express');

const app = express();

const API = "/api/v1";

app.use(API);

module.exports = app;