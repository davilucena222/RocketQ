/* Esse arquivo será executado fora do projeto, ele será inicializado apenas para iniciar o banco de dados */

const Database = require("./config")

const initDb = {

    //async -> é utilizado para esperar o retorno de uma função externa ou API, até que o seu resultado não seja recebido/retornado o código fica travado esperando o retorno para prosseguir sua execução
    async init(){
        //await -> espera a função Database() rodar para continuar a execução da próxima linha de código
        const db = await Database() //dando open() no banco de dados

        //onde será escrito o código SQL
        //a função exec() executa a busca por um padrão em uma determinada string para executar comando e ações
        await db.exec(`CREATE TABLE rooms (
            id INTEGER PRIMARY KEY, 
            pass TEXT
        )`);

        //criando tabela para inserir dados
        await db.exec(`CREATE TABLE questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT, 
            room INT 
        )`);

        await db.close() //fechando a conexão do banco de dados
    }
}

initDb.init()


