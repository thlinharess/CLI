import chalk from "chalk";

function extraiLinks(arrLinks) {
 return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLS) {
const arrStatus = await Promise
.all(
    listaURLS.map(async(url) => {
        try{
            const response = await fetch(url)
            return `${response.status} - ${response.statusText}`;
        } catch (erro){
             return manejaErros(erro);
        }
   }) 
  )
  return arrStatus;
}

function manejaErros(erro) {
   if(erro.cause.code === 'ENOTFOUND') {
    return 'link não encontrado'
   }else {
    return 'ocorreu algum erro';
   }
}

export default async function listaValidada(listaDeLinks) {
 const links = extraiLinks(listaDeLinks);
 const status = await checaStatus(links);

 return listaDeLinks.map((objecto , indice) => ({
    ...objecto,
    status: status[indice] 
 }));
}
