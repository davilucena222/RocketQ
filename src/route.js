//criando as rotas da aplicação
//importando o express
const express = require('express')

//importado o question controller
const QuestionController = require('./controllers/QuestionController')

const RoomController = require('./controllers/RoomController')

//constante route guarda todas as funcionalidades que o express tem
const route = express.Router()

//definindo as rotas
//res - responde alguma coisa
//dentro de render() passar o "ejs" que possui informações da página em html
route.get('/', (req, res) => res.render("index", {page: 'enter-room'}))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

//arquivo que trabalha com criação de salas
route.post('/create-room', RoomController.create)

//criando as outras rotas da aplicação
route.get('/room/:room', RoomController.open)

//criando uma rota para acessar a sala diretamente com o id (post -> enviando um formulário)
route.post('/enterroom', RoomController.enter)

//criando uma questão
//o segundo parâmetro do método POST já recebe como parâmetro (req, res) implicitamente
route.post('/question/create/:room', QuestionController.create)

//formato que o formulário de dentro da modal tem que passar a informação
route.post('/question/:room/:question/:action', QuestionController.index)

//exportando a constante route
module.exports = route