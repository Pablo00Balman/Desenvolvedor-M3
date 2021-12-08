document.addEventListener("keydown",(event) => {
    let name = event.key;
    if(name =="Escape")
    {
        fechar();
    }
})

//Pega JSON e carrega função "carregaPagina"--------------------------------------------------------
window.onload = function () {

    let url = "https://raw.githubusercontent.com/Pablo00Balman/Desenvolvedor-M3/master/roupas.json" ;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            const roupas = JSON.parse(this.responseText);
            localStorage.setItem("Json",JSON.stringify(roupas))
            carregaPagina();
        }
    }
    xhttp.open("GET", url)
    xhttp.send();
}

//Função que recarrega Divs após ativação dos filtros--------------------------------------
function resetar()
{
    let produtos = document.getElementById("produtos")
    produtos.innerHTML = "";
    carregaPagina();
}

//Função que verifica se existem filtros de cor ativos---------------------------------
function temCor ()
{
    let R;
    let filtroCores = ["amarelo","azul", "branco", "cinza", "laranja"]

    for(let i=0; i<filtroCores.length; i++)
    {
        let aux = document.getElementById(filtroCores[i])
        if(aux.checked == true)
        {
            R = true
        }
    }

    return R;
}

//----------
function temTamanho()
{
    let R;
    let filtroTamanhos = ["P","M","G","GG","36","38","40","42","44","46"]

    for(let i=0; i<filtroTamanhos.length; i++)
    {
        let aux = document.getElementById(filtroTamanhos[i])
        if(aux.checked == true)
        {
            R = true;
        }
    }

    return R;
}

//Carrega inúmeras divs em "produtos"--------------------------------------------------------------
function carregaPagina (){
    
    let roupas =JSON.parse(localStorage.getItem("Json"));
    let produtos = document.getElementById("produtos");
    let ordenar = document.getElementById("ordenar");

    if(ordenar.value == "menor_preco")
    {
        roupas.preco.sort();
    }

    //Define quantas divs serão geradas (Se filtros estiverem ativos, todas as divs são geradas)------------------------------------------
    let N = 6;
    if(temCor() || temTamanho())
    {
        N=roupas.length
    } 
    
    //Pega o número e gera as divs-------------------------------------------
    let i = 0;
    while( i<N)
    {
        produtos.appendChild(criaDiv(roupas,i));
        i++
    }

    //Verifica se existem filtros. Se sim, não gera botão, se sim, gera botão--------------------------------------------
    if(temCor() || temTamanho())
    {}
    else{
        

        let carregar = document.createElement("button");
        carregar.id = "carregarMais";
        carregar.innerHTML = "<b>CARREGAR MAIS</b>";
        produtos.appendChild(carregar);

        carregar.addEventListener("click", function()
        {
            for(let i=0; i<roupas.length-N; i++)
            {
                produtos.appendChild(criaDiv(roupas,i+N));
                carregar.remove();
            }
        });
    }
}

//Cria div unitária--------------------------------------------
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

        //Mecanismo de filtragem--------------------------------------------
        //Cores
        if(temCor())
        {
            div.style.display = "none"
  
            //Amarelo
            for(let j=0; j<roupas[i].cor.length; j++)
            {
                let amarelo = document.getElementById("amarelo");
                
                if(amarelo.checked == true && roupas[i].cor[j] == "amarelo")
                {
                    div.style.display = "block";  
                    let a 
                }
            }

            //Azul
            for(let j=0; j<roupas[i].cor.length; j++)
            {
                let azul = document.getElementById("azul");
                
                if(azul.checked == true && roupas[i].cor[j] == "azul")
                {
                    div.style.display = "block";      
                }
            }

           

            //Branco
            for(let j=0; j<roupas[i].cor.length; j++)
            {
                let branco = document.getElementById("branco");
                
                if(branco.checked == true && roupas[i].cor[j] == "branco")
                {
                    div.style.display = "block";   
                }
                
            }

            //Cinza
            for(let j=0; j<roupas[i].cor.length; j++)
            {
                let cinza = document.getElementById("cinza");
                if(cinza.checked == true && roupas[i].cor[j] == "cinza")
                {
                    div.style.display = "block";   
                }
            }

            //Laranja
            for(let j=0; j<roupas[i].cor.length; j++)
            {
                let laranja = document.getElementById("laranja");
                
                if(laranja.checked == true && roupas[i].cor[j] == "laranja")
                {
                    div.style.display = "block";   
                }
            }
            
            
            
        }
        
        //Tamanho------------------------------------------------------
        if(temTamanho())
        {

            resetar()
            //P
            let P = document.getElementById("P");

            if(P.checked == true && roupas[i].tamanho == "P")
            {
                div.style.display = "block";
            }

            //M
            let M = document.getElementById("M");

            

        }

    return div;
}


//-------------------------------------------------------------------------------------


// Função pop-up---------------------------------
function abrir()
{
    document.getElementById('popup').style.display = 'block';
    montaCarrinho();
}

function fechar()
{
    document.getElementById('popup').style.display =  'none';
}

//Função para adicionar itens ao carrinho----------------

function adicionar(id)
{
    let storage;
    botao=document.getElementById("botao"+id)

    if(localStorage.getItem("roupas")===null)
    {
        storage = [];
    } 
    else{
        storage = JSON.parse(localStorage.getItem("roupas"));
    }
    storage.push(id);
    localStorage.setItem("roupas",JSON.stringify(storage))

    botao.onclick = "";
    botao.innerHTML = "<b>COMPRADO</b>";
    botao.style.backgroundColor = "rgb(13, 90, 116)";
}

function montaCarrinho()
{
    let popup = document.getElementById("itens");
    let storage=JSON.parse(localStorage.getItem("roupas")) ;
    let roupas = JSON.parse(localStorage.getItem("Json"))

    if(localStorage.getItem("roupas")===null)
    {
        let carrinhoVazio = document.createElement("img");
        carrinhoVazio.src = "https://www.tingimentovirtual.com.br/public/img/carrinho-vazio.jpg";
        carrinhoVazio.id = "carrinhoVazio";
        popup.appendChild(carrinhoVazio);
    }
    
    else
    {
        popup.innerHTML ="";

        let compra = 0;

        let i=0;
        while( i<storage.length)
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
            titulo.innerHTML = "<b>"+roupas[storage[i]].nome+"</b>";
            titulo.style.width = "25%";
            div.appendChild(titulo);

            //Preço unitário
            let precoUni = document.createElement("p");
            let textoPrecoUni = document.createTextNode("Preço unitário: R$"+roupas[storage[i]].preco.toFixed(2));
            precoUni.style.width = "200px"
            precoUni.appendChild(textoPrecoUni);
            div.appendChild(precoUni); 

            //Botão quantidade mais
            let valor = 1;

            let quantidadeMais = document.createElement("button");
            quantidadeMais.innerHTML = "+";
            quantidadeMais.style.height = "35px";
            quantidadeMais.style.marginTop = "20px"
            quantidadeMais.style.marginLeft = "30px"
            quantidadeMais.style.fontSize = "25px"
            quantidadeMais.onclick = function()
            {
                valor = valor+1
                quantidade.innerHTML = valor;
                precoTotal.innerHTML = "R$ "+(roupas[i].preco*(valor)).toFixed(2);
                
            }
            div.appendChild(quantidadeMais);

            //Quantidade
            let quantidade = document.createElement("output");
            quantidade.innerHTML = valor;
            quantidade.style.marginTop = "25px"
            quantidade.style.marginLeft = "10px"
            quantidade.style.marginRight = "10px"
            div.appendChild(quantidade);

            //Quantidade   menos
            let quantidadeMenos = document.createElement("button");
            quantidadeMenos.innerHTML = "-";
            quantidadeMenos.style.height = "35px";
            quantidadeMenos.style.marginTop = "20px"
            quantidadeMenos.style.marginRight = "30px"
            quantidadeMenos.style.fontSize = "25px"
            quantidadeMenos.onclick = function()
            {
                if(valor != 0)
                {
                    valor = valor -1;
                    quantidade.innerHTML = valor;
                    precoTotal.innerHTML = "R$ "+(roupas[i].preco*(valor)).toFixed(2);
                }
            }
            div.appendChild(quantidadeMenos);


            //Preço total
            let precoTotal = document.createElement("output");
            precoTotal.innerHTML = "R$ "+(roupas[storage[i]].preco*valor).toFixed(2);
            precoTotal.classList.add("precoTotal")
            div.appendChild(precoTotal);

            popup.appendChild(div);

            compra = compra + parseFloat((roupas[storage[i]].preco*valor));

            i++;
        }

        let divBaixa = document.createElement("div");
        divBaixa.classList.add("divBaixa");

        //Valor da compra
        let valorCompra = document.createElement("output");
        valorCompra.innerHTML = "<b>Valor da compra:<br>R$"+compra.toFixed(2)+"</b>";
        valorCompra.classList.add("valorCompra")
        divBaixa.appendChild(valorCompra);


        //Botão esvaziar ---------------------------------------------------
        let esvaziar = document.createElement("button");
        esvaziar.id = "esvaziar";
        esvaziar.innerHTML = "<b>ESVAZIAR CARRINHO</b>"
        esvaziar.onclick = 
        function()
        {
            localStorage.removeItem("roupas");
            
            popup.innerHTML = "<img id="+"carrinhoVazio"+" src="+"https://www.tingimentovirtual.com.br/public/img/carrinho-vazio.jpg"+">";

            for(let j=0; j<roupas.length; j++){ 
                botao = document.getElementById("botao"+j)
                botao.innerHTML = "<b>COMPRAR</b>"
                botao.id = "botao"+j;
                botao.style.backgroundColor = "black"
                botao.onclick = function(){adicionar(j)}
            }
        }
        let hr = document.createElement("hr");
       
        popup.appendChild(divBaixa);
        popup.appendChild(hr);
        popup.appendChild(esvaziar);    
    }

    
}
