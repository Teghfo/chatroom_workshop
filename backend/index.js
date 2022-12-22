const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { dbConnection } = require("./db");
const { Chat } = require("./model");

dbConnection().catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "../front")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

io.on("connection", (socket) => {
  socket.on("start", (msg) => {
    console.log(msg);
  });

  socket.broadcast.emit("etesal", "ye nafar vasl shod");

  socket.on("disconnect", () => {
    socket.broadcast.emit("dis shodan", "ye nafar dis shod!");
  });

  socket.on("message", async (msg) => {
    const { nickName, message } = msg;
    const newChat = new Chat({ nickName, content: message });
    await newChat.save();
    socket.broadcast.emit("message", message);
  });

  socket.on("typing", (msg) => {
    socket.broadcast.emit("typing", msg);
  });

  socket.on("stop typing", (msg) => {
    socket.broadcast.emit("stop typing", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
