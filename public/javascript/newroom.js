const edificio = document.querySelector("#edificio");
const tipo = document.querySelector("#tipo");
const numero = document.querySelector("#numero");
const QRCode = document.querySelector("#QRCode");
const form = document.querySelector("form");

form.addEventListener("change", () => {
  QRCode.value = `${edificio.value} ${tipo.value} ${numero.value}`;
});
