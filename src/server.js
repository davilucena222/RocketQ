//Importando o express
const express = require('express')

//Importando o arquivo route.js para rodar no server
const route = require('./route')

//importando o path (módulo)
const path = require('path')

//Iniciando/executando o express
const server = express()

//informando ao express (server/servidor) que a view engine é o 'ejs'
server.set('view engine', 'ejs')

//informando ao express um conteúdo estático, onde vai ficar os arquivos do projeto a serem exibidos na tela (estilizações e conteúdos HTML)
server.use(express.static("public"))


//informando ao express (server/servidor) o caminho do arquivo html a ser exibido na tela para o usuário
server.set('views', path.join(__dirname, 'views'))

//midware: realiza a captura que está vindo do formulário, decodifica essas informações e repassa para o controller
server.use(express.urlencoded({extended: true}))

//informando ao node para usar o route.js
server.use(route)

//iniciando o servidor do node js e rodando-o em uma porta
server.listen(3000, () => console.log("RODANDO AGORA"))