const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const ulElement = document.getElementById("messages");

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
