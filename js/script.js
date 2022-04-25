const linksQuizz = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";
//usar o id = 84 para testar//

let infoBasicasQuizz={};
let arrayQuestions =[];

function validaInfoBasicas() {
    infoBasicasQuizz = {
      nome: document.getElementsByName('quizz-titulo')[0].value,
      img: document.getElementsByName('quizz-img')[0].value,
      qtdPerguntas: document.getElementsByName('quizz-qtd-perguntas')[0].value,
      qtdNiveis: document.getElementsByName('quizz-qtd-niveis')[0].value
    };

    if (verificaTamanhoTituloQuizz(infoBasicasQuizz.nome) && verificaUrl(infoBasicasQuizz.img) && verificaQtdPerguntas(infoBasicasQuizz.qtdPerguntas) && verificaQtdNiveis(infoBasicasQuizz.qtdNiveis) ) {
      
      document.querySelector(".step-1").classList.add("display-none");
      renderizaPerguntas();
    }else{
      infoBasicasQuizz={};
      return alert("dados inválidos");
    }

}

function renderizaPerguntas() {

    const corpoNivel = document.querySelector(".step-2 .creation-body");
    corpoNivel.innerHTML = ``;
    for (let index = 0; index < infoBasicasQuizz.qtdPerguntas; index++) {
      corpoNivel.innerHTML += `
        
        <div class="perguntas-body">
            <div role="button" class="hidden-menu" onclick="alternaPerguntas(this)">
                <h2>Pergunta ${index +1}</h2>
                <img class ="img-editar" src="imgs/editIcon.svg">
            </div>
            <div class="inputs">
                <input type="text" placeholder="Texto da pergunta" name="pergunta-texto"></input>
                <input type="text" placeholder="Cor de fundo da pergunta" name="pergunta-cor"></input>
                <hr>
                <h2>Resposta correta</h2>
                <input type="text" placeholder="Resposta correta" name="pergunta-resposta-${index}"></input>
                <input type="text" placeholder="URL da imagem" name="pergunta-url-img-${index}"></input>
                <hr>
                <h2>Respostas incorretas</h2>
                <input type="text" placeholder="Resposta incorreta 1" name="pergunta-resposta-${index}"></input>
                <input type="text" placeholder="URL da imagem 1" name="pergunta-url-img-${index}"></input>
                <hr>
                <input type="text" placeholder="Resposta incorreta 2" name="pergunta-resposta-${index}"></input>
                <input type="text" placeholder="URL da imagem 2" name="pergunta-url-img-${index}"></input>
                <hr>
                <input type="text" placeholder="Resposta incorreta 3" name="pergunta-resposta-${index}"></input>
                <input type="text" placeholder="URL da imagem 3" name="pergunta-url-img-${index}"></input>
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
  
  const perguntaTextoNode = document.querySelectorAll("input[name=pergunta-texto]");
  const perguntaCorNode = document.querySelectorAll("input[name=pergunta-cor]");


  let questions = [];

  for(let i = 0; i < infoBasicasQuizz.qtdPerguntas; i++){

    const perguntaRespostaNode = document.querySelectorAll(`input[name=pergunta-resposta-${i}]`);
    const perguntaRespostaImgNode = document.querySelectorAll(`input[name=pergunta-url-img-${i}]`);

    
    let title = perguntaTextoNode[i].value;
    let color = perguntaCorNode[i].value;

    if (!verificaTamanhoTitulo(title) && !verificaCor(color)  ) {
      return alert("Dados inválidos! Cheque os títulos das perguntas e a cor."); 
    }

    let answers = [];
    
    for(let j = 0; j < perguntaRespostaNode.length; j++){


      if (verificaTamanhoRespostasQuizz(perguntaRespostaNode[0].value) && verificaUrl(perguntaRespostaImgNode[0].value) && verificaTamanhoRespostasQuizz(perguntaRespostaNode[1].value) && verificaUrl(perguntaRespostaImgNode[1].value) ) {
        
        answers.push({
          text: perguntaRespostaNode[j].value,
          image: perguntaRespostaImgNode[j].value,
          isCorrectAnswer: false
        })
      }else{
        return alert("Dados inválidos! Cheque os títulos das respostas e as URL's."); 
      }
    }
    answers[0].isCorrectAnswer = true;
    
    questions.push({
      title: title,
      color: color,
      answers: answers
    })
  }
  

  arrayQuestions = questions;

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
  for (let index = 0; index < infoBasicasQuizz.qtdNiveis; index++) {
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
const verificaTamanhoNum = num => num >= 1;
const verificaQtdPerguntas = num => num >= 3;
const verificaQtdNiveis = num => num >= 2;

const verificaCor = cor => {
  let regex = /^#([0-9a-f]{3}){1,2}$/i;
  if (!regex.test(cor)) {
    return false;
  } else {
    return true;
  }
}
const verificaTamanhoTituloQuizz = titulo => titulo.length >= 20 && titulo.length <= 65;
const verificaTamanhoPerguntasQuizz = titulo => titulo.length >= 20;
const verificaTamanhoRespostasQuizz = titulo => titulo.length >= 1;
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
      title: infoBasicasQuizz.nome,
      image: infoBasicasQuizz.img,
      questions: arrayQuestions,
      levels: arrayNiveis
    }
    console.log(quizzFinal);
    let promise = axios.post(linksQuizz,quizzFinal);
    promise.then(guardaQuizz);
  }else{
    return alert("Dados inválidos"); 
  }
  
}

// funções da tela de finalizar a criação do quizz
function voltaHome(){
  console.log('volta para home');
  window.location.reload();
}

function mostraQuizz(id){

  document.querySelector(".tela1").classList.add("display-none");
  document.querySelector(".quizz-game").classList.remove("display-none");

  //alert(id);
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
  let tituloQuizz;
  let idx;
  for (let x = 0; x < localStorage.length; x++) {
    for (let y = 0; y< resposta.data.length; y++) {
      console.log("id"+ (x+1));
      idx = `id${(x+1)}`;
      console.log(idx);
      console.log(Number(localStorage[String(idx)]));
      console.log(Number(quizzesOutros[y].id));
      if (Number(localStorage[String(idx)]) === Number(quizzesOutros[y].id)){
        quizzesUsuario.push(resposta.data[y]);
        quizzesOutros.splice(y,1);
      } 
    }
    
  }
  let usuarioElemento = document.querySelector(".usuario-quizz .quizzes-lista");
  let outroElemento = document.querySelector(".outros-quizz .quizzes-lista");
  let noQuizzElemento = document.querySelector(".criar-container")
  let tituloOutrosElemento = document.querySelector(".seus-quizzes-titulo");
  if(quizzesUsuario.length === 0){
    tituloOutrosElemento = ``;
    noQuizzElemento.innerHTML = ``;
    noQuizzElemento.innerHTML = `
        <div class="div-criar-quizz">
            <h3>Você não criou nenhum quizz ainda :(</h3>
            <button onclick = "vaiCriarQuizz()">
              Criar Quizz
            </button>
        </div>
      
    `;
  }else{
    usuarioElemento.innerHTML = ``;
    tituloOutrosElemento.innerHTML = `
        <h2>Seus Quizzes</h2>
        <ion-icon role="button" name="add-circle-sharp" onclick = "vaiCriarQuizz()"></ion-icon>
    `;
    for (let index = 0; index < quizzesUsuario.length; index++) {
      imgQuizz = quizzesUsuario[index].image;
      tituloQuizz = quizzesUsuario[index].title;
      usuarioElemento.innerHTML +=`
      <div class="quizz-card" id ="${index}" role = "button" onclick="mostraQuizz(${quizzesUsuario[index].id})">
          <img src=${imgQuizz}>
          <div class="degrade">
            <p>${tituloQuizz}</p>   
          </div>
      </div>
    `;
    }
  }
  if (outroElemento.length != 0){
    outroElemento.innerHTML = ``;
    for (let index = 0; index < quizzesOutros.length; index++) {
      imgQuizz = quizzesOutros[index].image; 
      tituloQuizz = quizzesOutros[index].title;
      outroElemento.innerHTML +=`
      <div class="quizz-card" id ="${index}" role = "button" onclick="mostraQuizz(${quizzesOutros[index].id})">
          <img src=${imgQuizz}>
          <div class="degrade"> 
            <p>${tituloQuizz}</p>  
          </div>
      </div>
    `;
    }
  }
}

//inicializa o site
pegaQuizzes();