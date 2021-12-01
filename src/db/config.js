const sqlite3 = require("sqlite3")

//importando apenas uma função do sqlite (função open()) e guardando em uma variável chamada open
const { open } = require("sqlite")

module.exports = () => 
    open({
        filename: './src/db/rocketq.sqlite',
        driver: sqlite3.Database,
    });
