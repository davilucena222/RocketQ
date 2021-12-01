const Database = require("../db/config") //importando banco de dados

module.exports = {
     async create(req, res){
          const db = await Database() //criando uma variável para armazenar o banco de dados 

          //pegando a senha da sala
          const pass = req.body.password

          let roomId
          let isRoom = true

          while(isRoom){
               //gera o número da sala
               for(var i = 0; i < 6; i++){
                    i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString() 
               }

               //verificando se o número da sala existe
               //db.all() retorna tudo que tem naquele lugar específico do banco de dados
               const roomsExistIds = await db.all(`SELECT id FROM rooms`)

               //verificando se já existe o ID de alguma na sala no banco de dados
               isRoom = roomsExistIds.some(roomExistId => roomsExistIds === roomId)

               //se o isRoom não existir ele vai inserir no banco de dados
               if(!isRoom){
               //fazendo a inserção da sala no banco de dados
               // VALUES -> para informar quais campos serão preenchidos e a ordem
               await db.run(`INSERT INTO rooms (
                         id,
                         pass
                    ) VAlUES (
                        ${parseInt(roomId)},
                        ${pass} 
                    )`)

               }
     }
          
          //fechando o banco de dados
          await db.close()

          res.redirect(`/room/${roomId}`)
     },

     async open(req, res){
          //definindo o banco de dados para consultar dados
          const db = await Database()
          const roomId = req.params.room //pega o id da sala pela url da página
          
          //fazendo uma busca específica no banco de dados
          //selecionando uma sala específica de acordo com o seu (id)
          const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
          const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)

          let isNoQuestion

          if(questions.length == 0){
               if(questionsRead == 0){
                    isNoQuestion = true
               }
          }

          //roomId e questions -> são repassados ao ejs para pegar a sala, o conteúdo e atualizar a interface da sala de acordo com o seu conteúdo 
          //renderiza a sala com o id que foi capturado acima e as questões também
          res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestion: isNoQuestion})
     },

     //função para entrar na sala
     async enter(req, res){
          //importando banco de dados
          const db = await Database() 
          
          // pegando o id da sala que será informado pelo usuário
          const roomId = req.body.roomId

          //verificando o id dentro do banco de dados
          const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

          //verificando se a sala não existe
          if (typeof verifyRoom === "undefined") {
               res.render('idIncorrect')
          } else { //caso exista entra na sala
               res.redirect(`/room/${roomId}`);
          }
     }
}