import fs from 'fs';
import chalk from 'chalk';
import { text } from 'express';
import { compileFunction } from 'vm';


function extraiLinks(texto) {

    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
                      //spread operator
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'Não há Links no arquivo';
}

function trataErro(erro) {
    console.log(erro);
    throw new Error (chalk.red(erro));
}
    
    //async/await
    
    async function pegaArquivo(caminhoDoArquivo){
 try {
     const encoding = 'utf-8';
     const texto = await fs.promises
     .readFile(caminhoDoArquivo, encoding)
       return extraiLinks(texto);
    } catch(erro) {
        trataErro(erro);
  }
}
                
export default pegaArquivo;
                
///\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)








// promises com then

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//       .readFile(caminhoDoArquivo , encoding)
//       .then((texto) => console.log(chalk.green(texto) ) )
//       .catch(trataErro); 
// }

//Código Síncrono

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//      fs.readFile(caminhoDoArquivo, encoding , (erro,texto) =>{
//         if(erro){
//             trataErro(erro);
//         }
//         console.log(chalk.red(texto))
//      })
// }
