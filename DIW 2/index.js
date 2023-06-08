let url = window.location.href;
const idd = url.substring(url.lastIndexOf('=') + 1);




function recarregarPag() {
  window.history.pushState({}, '','index.html');
  location.reload();
}
//inicia a pag carregando todos produtos
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buscar').addEventListener('click', buscarProdutos);
  document.getElementById('filtrar').addEventListener('click', buscarProdutos);
  buscarProdutos(); // Chama a função para carregar os produtos ao carregar a página
});

function buscarProdutos(event) {
  if (event) {
    event.preventDefault(); // Evita o comportamento padrão do botão
  }

  const filtro = {
    palavraChave: document.getElementById('busca').value.toLowerCase(),
    categoria: document.getElementById('categoria').value.toLowerCase(),
    precoMin: parseFloat(document.getElementById('precoMin').value),
    precoMax: parseFloat(document.getElementById('precoMax').value)
  };

  if(idd!=url){
    filtro.palavraChave = idd;
  }

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      console.log('Adicionando na tela');
      let content = '';
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (
          item.title.toLowerCase().includes(filtro.palavraChave) &&
          (filtro.categoria === '' || item.category.toLowerCase() === filtro.categoria) &&
          (isNaN(filtro.precoMin) || item.price >= filtro.precoMin) &&
          (isNaN(filtro.precoMax) || item.price <= filtro.precoMax)) {
          content += `<div class="col-md-3">
            <div class="card mb-4" >
              <img class="card-img-top product-image" src="${item.image}" alt="Jersey Buccaneers">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">R$${item.price}</p>
                    <button class="btn btn-primary botao" id="produto-${item.id}">Mais detalhes</button>
              </div>
            </div>
          </div>`;
        }
      }
      document.getElementById('conteudo').innerHTML = content;

      document.getElementById('corusel').innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" id="">
        <div class="carousel-item active">
          <img src="${data[2].image}" class="d-block w-100" alt="Slide 1" style="height: 500px; object-fit: contain;">
          </div>
          <div class="carousel-item">
          <img src="${data[5].image}" class="d-block w-100" alt="Slide 2" style="height: 500px; object-fit: contain;">
          </div>
          <div class="carousel-item">
          <img src="${data[13].image}" class="d-block w-100" alt="Slide 3" style="height: 500px; object-fit: contain;">
          </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>`

      const buttons = document.querySelectorAll('.botao')
      buttons.forEach(button => {
        button.onclick = function (){
          let idItem = this.id.split('-')[1]
          window.location.href = "detalhes.html"+"?id="+idItem
        }
      })

      if(idd!=url){
        filtro.palavraChave = idd;
        buscarProdutos2();
      }

    });
}
