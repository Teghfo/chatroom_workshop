const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  nickName: String,
  content: String,
});

exports.Chat = mongoose.model("Chat", chatSchema);
