const addCategory = document.querySelector("#addCategory");
const ul = document.querySelector("ul");

addCategory.addEventListener("click", () => {
  const li = document.createElement("li");

  const labelCategory = document.createElement("label");
  labelCategory.textContent = "Categoria: ";
  li.appendChild(labelCategory);

  const category = document.createElement("input");
  category.setAttribute("name", "subCategories");
  category.required = true;
  li.appendChild(category);

  const span = document.createElement("span");
  span.setAttribute("class", "close");
  span.textContent = " x";
  li.appendChild(span);

  ul.appendChild(li);
});

ul.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.tagName === "SPAN") {
    clickedElement.parentElement.remove();
  }
});
