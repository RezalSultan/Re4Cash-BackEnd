require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");


const app = express();
const PORT = process.env.PORT;
const server = createServer(app);

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.send("hello word");
})

server.listen(PORT, () => {
   console.log(`Server has been running in http://localhost:${PORT}`);
});