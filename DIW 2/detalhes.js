let url = window.location.href
const idd = url.substring(url.lastIndexOf('=') + 1)

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {

        console.log('criando.');
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].id == idd){
                document.getElementById('conteudo').innerHTML = `<div class="row border rounded mb-5">
                <div class="col-md-8 col-sm-12 border border-dark rounded  ">
                    <img class="img-fluid d-flex mx-auto" id="imagemProduto" src="${data[i].image}" alt="imag">
                </div>
                <div class="col-md-4 col-sm-12 border d-flex justify-content-center ">
                    <div class="border border-dark p-2 rounded bordinha">
                        <h4 class="mb-5 col-12 mx-auto m-3">
                            ${data[i].title}
                        </h4>
                        <p>
                            ${data[i].description}
                        </p>
                        <p>
                            <strong>Avaliação:</strong> ${data[i].rating.rate}/5<br>
                        </p>
                        <div class="row mt-4">
                            <div class="col-auto">
                                <p> R$${data[i].price} </p>
                            </div>
                            <div class=="col-auto ml-4">   
                                <button type="submit" class="btn btn-primary btn-block" id="compra">Comprar</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>`
            }
        }
    })

//PEDRAGENS
const botaoBuscar = document.getElementById('buscar');
botaoBuscar.addEventListener('click', buscador) 

function buscador(event){ 
    if(event){
        event.preventDefault()
    }

    var palavraBusca = document.getElementById('busca').value.toLowerCase()
    if(palavraBusca !== null || palavraBusca !== ''){
        window.location.href = "index.html"+"?nome="+palavraBusca
    }else{
        return
    }


}
