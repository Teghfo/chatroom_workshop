const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../front")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

io.on("connection", (socket) => {
  socket.on("start", (msg) => {
    console.log(msg);
  });

  console.log("ye nafar vasl shod");

  socket.on("disconnect", () => {
    console.log("ye nafar dis shod");
  });

  socket.on("message", (msg) => console.log(msg));
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
