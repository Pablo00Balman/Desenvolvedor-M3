//Pega JSON e carrega função "carregaPagina"--------------------------------------------------------
window.onload = function () {

    let url = "https://raw.githubusercontent.com/Pablo00Balman/Desenvolvedor-M3/master/roupas.json";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            let roupas = JSON.parse(this.responseText);
            carregaPagina(roupas);
            montaCarrinho(roupas);
        }
    }
    xhttp.open("GET", url)
    xhttp.send();
}

//Carrega inúmeras divs em "produtos"--------------------------------------------------------------
function carregaPagina (roupas){
    
    let produtos = document.getElementById("produtos");
    let N = 6;

    for(let i=0; i<N; i++)
    {
        produtos.appendChild(criaDiv(roupas,i));
    }

    let carregar = document.createElement("button");
    carregar.id = "carregarMais";
    carregar.innerHTML = "<b>CARREGAR MAIS</b>";
    produtos.appendChild(carregar);

    carregar.addEventListener("click", function(){
        for(let i=0; i<roupas.length-N; i++)
    {
        produtos.appendChild(criaDiv(roupas,i+N));
        carregar.remove();
    }
    } );
}

//Cria div unitária---------------------------------------------
function criaDiv (roupas, i)
{
    let div = document.createElement("div");
        
        div.classList.add("roupas");

        //Imagem---------------------------------
        let foto = document.createElement("img");
        foto.classList.add("foto");
        foto.src = roupas[i].imagem;
        div.appendChild(foto);

        //Título---------------------------------
        let titulo = document.createElement("p");
        let textoTitulo = document.createTextNode(roupas[i].nome);
        titulo.appendChild(textoTitulo);
        div.appendChild(titulo);

        //Preço-----------------------------------
        let preco = document.createElement("p");
        preco.classList.add("preco");
        preco.innerHTML = "<b>R$ "+roupas[i].preco.toFixed(2)+"</b>";
        div.appendChild(preco);

        //Parcelas-------------------------------
        let valor = roupas[i].preco/roupas[i].parcelas
        let parcelas = document.createElement("p");
        parcelas.innerHTML = "até "+roupas[i].parcelas+"x de R$"+valor.toFixed(2);
        div.appendChild(parcelas);

        //Botão----------------------------------
        let botao = document.createElement("button");
        botao.classList.add("botaoComprar");

        botao.innerHTML = "<b>COMPRAR</b>"
        botao.id = "botao"+i;
        botao.onclick = function(){adicionar(i)}

        if(localStorage.getItem("roupas") != null)
        {
            vetor = localStorage.getItem("roupas");
            for(let j=0; j<vetor.length;j++)
            {
                if(vetor[j]==i)
                {
                    botao.onclick = "";
                    botao.innerHTML = "<b>COMPRADO</b>";
                    botao.style.backgroundColor = "rgb(13, 90, 116)";
                }
            }
        }

        div.appendChild(botao);

        return div;
}


//-------------------------------------------------------------------------------------


// Função pop-up---------------------------------
function abrir()
{
    document.getElementById('popup').style.display = 'block';
}

function fechar()
{
    document.getElementById('popup').style.display =  'none';
}

//Função para adicionar itens ao carrinho----------------

function adicionar(id)
{
    botao=document.getElementById("botao"+id)

    if(localStorage.getItem("roupas")==null)
    {
        localStorage.setItem('roupas',id);
    } 
    else{
        let storage = []
        storage[0] = localStorage.getItem("roupas");
        storage.push(id);
        localStorage.setItem("roupas", storage);
    }

    botao.onclick = "";
    botao.innerHTML = "<b>COMPRADO</b>";
    botao.style.backgroundColor = "rgb(13, 90, 116)";
}

function montaCarrinho(roupas)
{
    let popup = document.getElementById("popup");
    let storage=JSON.parse(localStorage.getItem("roupas")) ;

    for(let i=0; i<storage.length; i++)
    {
        let div = document.createElement("div");
        div.classList.add("carrinho");
     
        //Imagem
        let foto = document.createElement("img");
        foto.classList.add("foto");
        foto.src = roupas[storage[i]].imagem;
        div.appendChild(foto);

        //Título
        let titulo = document.createElement("p");
        titulo.innerHTML = "<b>"+roupas[i].nome+"</b>";
        div.appendChild(titulo);

        //Preço unitário
        let precoUni = document.createElement("p");
        let textoPrecoUni = document.createTextNode("Preço unitário: R$"+roupas[i].preco+",00");
        precoUni.appendChild(textoPrecoUni);
        div.appendChild(precoUni);

        //Botão quantidade
        let quantidade = document.createElement("button");

        popup.appendChild(div);   
    }
}

//Zera Web Storage------------------
function zera()
{
    localStorage.removeItem("roupas");

    for(let i=0; i<9; i++){ document.getElementById("botao"+i)
    botao.innerHTML = "<b>COMPRAR</b>"
    botao.id = "botao"+i;
    botao.onclick = function(){adicionar(i)}}
}