const socket = io();

let typing = false;
let nickName;

const form = document.getElementById("form");
const loginForm = document.getElementById("login-form");
const input = document.getElementById("input");
const divLogin = document.getElementById("login");
const divChat = document.getElementById("chat");
const loginInput = document.getElementById("login-input");
const ulElement = document.getElementById("messages");
const pElement = document.getElementById("is-typing-notify");

const username = "Ashkan";

socket.on("etesal", (msg) => {
  const liItem = document.createElement("li");
  liItem.textContent = msg;
  ulElement.appendChild(liItem);
});

socket.on("dis shodan", (msg) => {
  const liItem = document.createElement("li");
  liItem.textContent = msg;
  ulElement.appendChild(liItem);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  nickName = loginInput.value;
  divLogin.style.display = "none";
  divChat.style.display = "block";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const liItem = document.createElement("li");
  const message = `${nickName} ----> ${input.value}`;
  liItem.textContent = message;
  ulElement.appendChild(liItem);
  socket.emit("message", message);
  window.scrollTo(0, document.body.scrollHeight);
  input.value = "";
});

addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && input === document.activeElement) {
    typing = true;
  }
});

setInterval(() => {
  if (typing) {
    socket.emit("typing", "");
    typing = false;
  } else {
    socket.emit("stop typing", "");
  }
}, 1000);

socket.on("typing", () => {
  pElement.textContent = "...is typing";
  pElement.style.display = "block";
});

socket.on("stop typing", () => {
  pElement.textContent = "";
  pElement.style.display = "none";
});

socket.on("message", (msg) => {
  const liItem = document.createElement("li");
  const message = msg;
  liItem.textContent = message;
  ulElement.appendChild(liItem);
});
