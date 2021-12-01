const Database = require('../db/config') //importando o banco de dados

module.exports = {
     async index(req, res){
          const db = await Database()
          const roomId = req.params.room
          const questionId = req.params.question
          const action = req.params.action
          const password = req.body.password

          /* verificar se a senha está correta */
          //db.get() -> traz um único elemento do banco de dados
          const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

          //verificando a senha de acordo com o (id) da sala
          if(verifyRoom.pass == password){
               if(action == "delete"){
                    
                    //deletando uma pergunta do banco de dados
                    await db.run(`DELETE FROM questions WHERE id = ${questionId}`) 
               } else if(action == "check"){

                    //marcando como "lida" uma questão do banco de dados
                    await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
               }    
               res.redirect(`/room/${roomId}`)
          } else { //redirecionando para uma página que vai indicar que a senha está incorreta
               res.render('passincorrect', { roomId: roomId })
          }

     },

     //função para criar uma sala
     async create(req, res){
          const db = await Database() //inicializando o banco de dados para guardar os dados
          const question = req.body.question //capturando a questão
          const roomId = req.params.room //capturando a sala (id)

          //quando inserir um text no banco de dados coloque o conteúdo entre ""
          await db.run(`INSERT INTO questions (
              title,
              room,
              read
          )VALUES(
               "${question}", 
               ${roomId},
               0
          )`)
          
          res.redirect(`/room/${roomId}`)
     }
}