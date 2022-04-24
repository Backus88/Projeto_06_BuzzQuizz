const linksQuizz = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
//usar o id = 84 para testar//

let infoBasicasQUizz={};

function validaInfoBasicas() {
    infoBasicasQUizz = {
        nome: document.getElementsByName('quizz-titulo')[0].value,
        img: document.getElementsByName('quizz-img')[0].value,
        qtdPerguntas: document.getElementsByName('quizz-qtd-perguntas')[0].value,
        qtdNiveis: document.getElementsByName('quizz-qtd-niveis')[0].value
    };

    document.querySelector(".step-1").classList.add("display-none");
    renderizaPerguntas();
}

function renderizaPerguntas() {

    const corpoNivel = document.querySelector(".step-2 .creation-body");
    corpoNivel.innerHTML = ``;
    for (let index = 0; index < infoBasicasQUizz.qtdPerguntas; index++) {
      corpoNivel.innerHTML += `
        
        <div class="perguntas-body">
            <div role="button" class="hidden-menu" onclick="alternaPerguntas(this)">
                <h2>Pergunta ${index +1}</h2>
                <img class ="img-editar" src="imgs/editIcon.svg">
            </div>
            <div class="inputs">
                <input type="text" placeholder="Texto da pergunta" name="pergunta-${index}-texto"></input>
                <input type="text" placeholder="Cor de fundo da pergunta" name="pergunta-${index}-"></input>
                <hr>
                <h2>Resposta correta</h2>
                <input type="text" placeholder="Resposta correta" name="pergunta-${index}-resposta-correta"></input>
                <input type="text" placeholder="URL da imagem" name="pergunta-${index}-url-imagem"></input>
                <hr>
                <h2>Respostas incorretas</h2>
                <input type="text" placeholder="Resposta incorreta 1" name="pergunta-${index}-resposta-incorreta-1"></input>
                <input type="text" placeholder="URL da imagem 1" name="pergunta-${index}-url-imagem-incorreta-1"></input>
                <hr>
                <input type="text" placeholder="Resposta incorreta 1" name="pergunta-${index}-resposta-incorreta-2"></input>
                <input type="text" placeholder="URL da imagem 1" name="pergunta-${index}-url-imagem-incorreta-2"></input>
                <hr>
                <input type="text" placeholder="Resposta incorreta 1" name="pergunta-${index}-resposta-incorreta-3"></input>
                <input type="text" placeholder="URL da imagem 1" name="pergunta-${index}-url-imagem-incorreta-3"></input>
            </div>
        </div>
        `;
    }

    document.querySelector(".step-2").classList.remove("display-none");

    
}
function alternaPerguntas(elemento){

    elemento = elemento.parentNode;

    let selecionado = document.querySelector(".perguntas-body.active");

    if (selecionado == null) {
  
      elemento.classList.add("active");
      
    }else{
      
      elemento.classList.toggle("active"); 	
    }
}
function validaPerguntas(){
    
    document.querySelector(".step-2").classList.add("display-none");

    renderizaNiveis();
}

// função alterna estado do nível
function alternaNiveis(elemento) {
  let imgDisplays;
  let imgElemento;
  let hiddenBody;
  imgElemento = elemento.querySelector(".img-editar");
  imgDisplays = document.querySelector(".hidden-menu > .display-none");
  if (imgDisplays != null) {
    hiddenBody = imgDisplays.parentElement.parentElement.querySelector(".hidden-body");
  }

  if (imgElemento.classList.contains("display-none")) {
    imgElemento.classList.remove("display-none");
    imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.add("display-none");
    return;
  }
  if (imgDisplays === null) {
    imgElemento.classList.add("display-none");
    imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.remove("display-none")
    return;
  }
  if (imgDisplays.classList.contains("display-none") && imgElemento.classList.contains("display-none") === false) {
    imgDisplays.classList.remove("display-none");
    hiddenBody.classList.add("display-none");
    imgElemento.classList.add("display-none");
    imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.remove("display-none");
    return;
  }
}

function renderizaNiveis() {
 
  const corpoNivel = document.querySelector(".step-3 .creation-body");
  corpoNivel.innerHTML = ``;
  for (let index = 0; index < infoBasicasQUizz.qtdNiveis; index++) {
    corpoNivel.innerHTML += `
    <div class="nivel-body">
        <div role="button" class="hidden-menu" onclick="alternaNiveis(this)">
          <h2>Nível ${index +1}</h2>
          <img class ="img-editar" src="imgs/editIcon.svg">
        </div>
        <div class="hidden-body display-none">
          <input type="text" placeholder="Título do nível" name="nivel-titulo"></input>
          <input type="text" placeholder="% de acerto mínima" name="nivel-acertos"></input>
          <input type="text" placeholder="URL da imagem do nível" name="nivel-url"></input>
          <input type="text" placeholder="Descrição do nível" name="nivel-descricao" class="input-descricao"></input>
        </div>
      </div>   
      `;
  }

  document.querySelector(".step-3").classList.remove("display-none");
}


//funções para validar os campos do nível
const verificaTamanhoTitulo = titulo => titulo.length >= 10;
const verificaPorcentagem = porcentagem => porcentagem >= 0 && porcentagem <= 100;
const verificaUrl = urlValid => {
  let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(urlValid)) {
    return false;
  } else {
    return true;
  }
}
const verificaTamanhoDescricao = descricao => descricao.length >= 30;
const verificaNiveis = niveis => niveis === '0';

const guardaQuizz = resposta =>{
  localStorage.setItem(`id${localStorage.length+1}`, resposta.data.id);
  document.querySelector(".step-3").classList.add("display-none");
  document.querySelector(".step-4").classList.remove("display-none");
}
const erroCriacao = erro =>{
  console.log(erro.response.status);
}

//função que vai no onclick e passa para a fase seguinte caso os campos sejam validados
function validaNivel() {
  let quizzFinal = {};
  const arrayNiveis =[];
  const tituloNode = document.querySelectorAll("input[name= nivel-titulo]");
  const acertoNode = document.querySelectorAll("input[name= nivel-acertos]");
  const nivelUrlNode = document.querySelectorAll("input[name= nivel-url]");
  const descricaoNode = document.querySelectorAll("input[name= nivel-descricao]");
  let nivelzero = false;
  let titulo, acerto, nivelUrl, descricao;
  for (let index = 0; index < tituloNode.length; index++) {
    titulo = tituloNode[index].value;
    acerto = acertoNode[index].value;
    nivelUrl = nivelUrlNode[index].value;
    descricao = descricaoNode[index].value;
    if(nivelzero === false){
      nivelzero = verificaNiveis(acerto);
      console.log(acerto);
      console.log(nivelzero);
    }
    if (verificaTamanhoTitulo(titulo) && verificaPorcentagem(acerto) && verificaUrl(nivelUrl) && verificaTamanhoDescricao(descricao)) {
      arrayNiveis.push({
        title: titulo,
        image: nivelUrl,
        text: descricao,
        minValue: acerto
      })
    } 
  }
  for (let index = 0; index < tituloNode.length; index++) {
    tituloNode[index].value = '';
    acertoNode[index].value = '';
    nivelUrlNode[index].value = '';
    descricaoNode[index].value = '';

  }
  console.log(nivelzero)
  if(arrayNiveis.length === tituloNode.length && nivelzero){
    quizzFinal = {
      title: 'Titulo do quiz',
      image: 'https://http.cat/411.jpg',
      questions: arrayQuestions,
      levels: arrayNiveis
    }
    console.log(quizzFinal);
    let promise = axios.post(linksQuizz,quizzFinal);
    promise.then(guardaQuizz);
  }else{
    return alert("dados inválidos"); 
  }
  
}

// funções da tela de finalizar a criação do quizz
function voltaHome(){
  console.log('volta para home');
}

function mostraQuizz(){
  console.log('mostra quizz');
}

// muda para a tela criarquizz
function vaiCriarQuizz(){
  document.querySelector(".tela1").classList.add("display-none");
  document.querySelector(".step-1").classList.remove("display-none");
}

// pega os quizzes
function pegaQuizzes(){
  promise = axios.get(linksQuizz);
  promise.then(renderizaQuizzes);
}

//renderiza a lista de quizzes considerando os quizzes do usuario
function renderizaQuizzes(resposta){
const quizzesUsuario = [];
const quizzesOutros = resposta.data;
  let imgQuizz;
  for (let x = 0; x < localStorage.length; x++) {
    for (let y = 0; y< resposta.data; y++) {
      console.log(Number(localStorage["id"+x]));
      console.log(resposta[y].data.id)
      if (Number(localStorage["id"+x]) === resposta[y].data.id){
        quizzesUsuario.push(resposta.data[y]);
        quizzesOutros.splice(y,1);
      } 
    }
    
  }
  let usuarioElemento = document.querySelector(".usuario-quizz .quizzes-lista");
  let outroElemento = document.querySelector(".outros-quizz .quizzes-lista");
  let noQuizzElemento = document.querySelector(".div-criar-quizz")
  let tituloOutrosElemento = document.querySelector("seus-quizzes-titulo");
  if(quizzesUsuario.length === 0){
    tituloOutrosElemento = ``;
    noQuizzElemento.innerHTML = ``;
    noQuizzElemento.innerHTML = `
      <h3>Você não criou nenhum quizz ainda :(</h3>
      <button onclick = "vaiCriarQuizz()">
          Criar Quizz
      </button>
    `;
  }else{
    usuarioElemento.innerHTML = ``;
    tituloOutrosElemento = `
        <h2>Seus Quizzes</h2>
        <ion-icon role="button" name="add-circle-sharp" onclick = "vaiCriarQuizz()"></ion-icon>
    `;
    for (let index = 0; index < quizzesUsuario.length; index++) {
      imgQuizz = quizzesUsuario[index].image;
      usuarioElemento.innerHTML +=`
      <div class="quizz-card" id ="${index}" role = "button">
          <img src=${imgQuizz}>
          <div class="degrade">   
          </div>
      </div>
    `;
    }
  }
  if (outroElemento.length != 0){
    outroElemento.innerHTML = ``;
    for (let index = 0; index < quizzesOutros.length; index++) {
      imgQuizz = quizzesOutros[index].image; 
      outroElemento.innerHTML +=`
      <div class="quizz-card" id ="${index}" role = "button">
          <img src=${imgQuizz}>
          <div class="degrade">   
          </div>
      </div>
    `;
    }
  }
}

//inicializa o site
pegaQuizzes();