
// função alterna estado do nível
function alternaNiveis(elemento){
    console.log('0if');
    const imgElemento = elemento.querySelector(".img-editar");
    const imgDisplays = document.querySelector(".hidden-menu > .display-none");
    if(imgDisplays != null){
       const hiddenBody = imgDisplays.parentElement.parentElement.querySelector(".hidden-body");
    }

    if(imgElemento.classList.contains("display-none")){
        console.log('1if');
        imgElemento.classList.remove("display-none");
        imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.add("display-none");
        return;
    }
    if(imgDisplays === null){
        console.log('2if');
        imgElemento.classList.add("display-none");
        imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.remove("display-none")
        return;
    }
    if(imgDisplays.classList.contains("display-none") && imgElemento.classList.contains("display-none") === null){
        console.log('3if');
        imgDisplays.classList.remove("display-none");
        hiddenBody.classList.add("display-none");
        imgElemento.classList.add("display-none");
        imgElemento.parentElement.parentElement.querySelector(".hidden-body").classList.remove("display-none");
        return;
    }
}

//funções para validar os campos do nível
const verificaTamanhoTitulo = titulo => titulo.length >= 10;
const verificaPorcentagem = porcentagem => porcentagem >= 0 && porcentagem <= 100;
const verificaUrl = urlValid => {
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(urlValid)) {
    return false;
  } else {
    return true;
  }
}
const verificaTamanhoDescricao = descricao => descricao.length >=30;