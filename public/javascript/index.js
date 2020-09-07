const form = document.querySelector("form");

form.addEventListener("submit", event => {
  const cmpPesquisa = document.querySelector("#pesquisa").value;

  if (isNaN(cmpPesquisa)) {
    alert(
      "Oi, você colocou letra(as) no campo de busca, não posso aceitar :/ favor corrigir :)"
    );
    event.preventDefault();
  }
});

const contRegistro = document.querySelectorAll(".contRegistro");
const tfoot = document.querySelector("tfoot tr td").innerHTML;
let rodape = document.querySelector("tfoot tr td");

rodape.innerHTML = `Exibindo ${contRegistro.length} registros de ${tfoot}`;
