const perguntasArray = [];
const infoObjeto ={};

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
    console.log('imgElemento:'+ imgElemento);
    console.log('imgDisplay:'+ imgDisplays);
    console.log('hiddenbody:'+ hiddenBody);
    imgElemento.classList.remove("display-none");
    imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.add("display-none");
    return;
  }
  if (imgDisplays === null) {
    console.log('imgElemento:'+ imgElemento);
    console.log('imgDisplay:'+ imgDisplays);
    console.log('hiddenbody:'+ hiddenBody);
    imgElemento.classList.add("display-none");
    imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.remove("display-none")
    return;
  }
  if (imgDisplays.classList.contains("display-none") && imgElemento.classList.contains("display-none") === false) {
    console.log('imgElemento:'+ imgElemento);
    console.log('imgDisplay:'+ imgDisplays);
    console.log('hiddenbody:'+ hiddenBody);
    imgDisplays.classList.remove("display-none");
    hiddenBody.classList.add("display-none");
    imgElemento.classList.add("display-none");
    imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.remove("display-none");
    return;
  }
}


function renderizaNiveis() {
  // para simular o recebimento do numero de niveis
  let numeroNiveis = 2;
  //
  const corpoNivel = document.querySelector(".step-3 .creation-body");
  corpoNivel.innerHTML = ``;
  for (let index = 0; index < numeroNiveis; index++) {
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
}

renderizaNiveis();

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
//função quevai no onclick e passa para a fase seguinte caso os campos sejam validados
function validaNivel() {
  const arrayNiveis =[];
  const tituloNode = document.querySelectorAll("input[name= nivel-titulo]");
  const acertoNode = document.querySelectorAll("input[name= nivel-acertos]");
  const nivelUrlNode = document.querySelectorAll("input[name= nivel-url]");
  const descricaoNode = document.querySelectorAll("input[name= nivel-descricao]");

  let titulo, acerto, nivelUrl, descricao;
  for (let index = 0; index < tituloNode.length; index++) {
    titulo = tituloNode[index].value;
    acerto = acertoNode[index].value;
    nivelUrl = nivelUrlNode[index].value;
    descricao = descricaoNode[index].value;
    if (verificaTamanhoTitulo(titulo) && verificaPorcentagem(acerto) && verificaUrl(nivelUrl) && verificaTamanhoDescricao(descricao)) {
      arrayNiveis.push({
        titulo: titulo,
        acerto: acerto,
        urll: nivelUrl,
        descricao: descricao
      })
    } 
  }
  for (let index = 0; index < tituloNode.length; index++) {
    tituloNode[index].value = '';
    acertoNode[index].value = '';
    nivelUrlNode[index].value = '';
    descricaoNode[index].value = '';

  }
  if(arrayNiveis.length === tituloNode.length){
    return console.log(arrayNiveis);
  }
  return alert("dados inválidos"); 
}

function voltaHome(){
  console.log('volta para home');
}

function mostraQuizz(){
  console.log('mostra quizz');
}