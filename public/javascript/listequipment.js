const labels = document.querySelectorAll("main > label");
labels.forEach((label) => {
  label.setAttribute("data-clicked", "n");
  label.addEventListener("click", (event) => {
    const clickedElement = event.currentTarget;
    // console.log((clickedElement).getAttribute('data-clicked'));
    if (clickedElement.getAttribute("data-clicked") === "n") {
      clickedElement.style.background = "#e74c3c";

      const recursoName = clickedElement.querySelector("p").textContent;

      const recurso = document.createElement("input");
      recurso.setAttribute("type", "hidden");
      recurso.setAttribute("name", "recurso");
      recurso.setAttribute("value", recursoName);
      clickedElement.appendChild(recurso);

      const checkLabel = document.createElement("label");
      checkLabel.setAttribute("for", clickedElement.className + "check");
      checkLabel.textContent = "Tudo certo?";
      clickedElement.appendChild(checkLabel);

      const checkCategory = document.createElement("input");
      checkCategory.setAttribute("id", clickedElement.className + "check");
      checkCategory.setAttribute("type", "checkbox");
      clickedElement.appendChild(checkCategory);

      const labelSub = document.createElement("label");
      labelSub.setAttribute("for", clickedElement.className + "sub");
      labelSub.innerHTML = "Escolher uma categoria:";
      clickedElement.appendChild(labelSub);

      const selectSubCategory = document.createElement("select");
      arrCategories.forEach((Categories) => {
        if (Categories.category === recursoName) {
          Categories.subCategories.forEach(function (subCategory) {
            selectSubCategory.innerHTML += `<option>${subCategory.subCategory}</option>`;
          });
        }
      });
      selectSubCategory.setAttribute("id", clickedElement.className + "sub");
      selectSubCategory.setAttribute("name", "recurso");
      clickedElement.appendChild(selectSubCategory);

      const textArea = document.createElement("textarea");
      textArea.setAttribute("rows", "4");
      textArea.setAttribute("maxlength", "150");
      textArea.setAttribute("placeholder", "Observações");
      textArea.setAttribute("name", "recurso");
      clickedElement.appendChild(textArea);

      clickedElement.setAttribute("data-clicked", "s");
    } else if (
      clickedElement.querySelector('input[type="checkbox"]').checked === true
    ) {
      clickedElement.style.background = "#2ecc71";
      clickedElement.querySelectorAll("label").forEach((label) => {
        label.remove();
      });
      clickedElement.querySelectorAll("select").forEach((select) => {
        select.remove();
      });
      clickedElement.querySelectorAll("input").forEach((input) => {
        input.remove();
      });
      clickedElement.querySelector("textarea").remove();
      clickedElement.setAttribute("data-clicked", "n");
    }
  });
});
