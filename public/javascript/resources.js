// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const addCategory = document.querySelector('input[type="button"]');
const form = document.querySelector("form");

addCategory.addEventListener("click", () => {
  const labelCategory = document.createElement("label");
  labelCategory.textContent = "Categoria:";
  form.insertBefore(labelCategory, addCategory);

  const category = document.createElement("input");
  category.setAttribute("name", "subCategories");
  category.required = true;
  form.insertBefore(category, addCategory);
});
