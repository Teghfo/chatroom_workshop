const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "../front")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
