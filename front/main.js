const socket = io();

let typing = false;

const form = document.getElementById("form");
const input = document.getElementById("input");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const liItem = document.createElement("li");
  liItem.textContent = input.value;
  ulElement.appendChild(liItem);
  socket.emit("message", input.value);
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
