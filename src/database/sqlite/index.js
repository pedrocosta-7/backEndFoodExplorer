const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path")

async function sqliteConnection(){
   const database = await sqlite.open({
     filename : path.resolve(__dirname, "..", "database.db"),
     driver: sqlite3.Database
   })

   return database;
}

module.exports = sqliteConnection;  

/* AQUI A GENTE CRIA O BANCO DE DADOS NA NOSSA APLICAÇÃO, É IMPORTANTE QUE A GENTE CRIE ESSE BANCO DE DADOS ANTES DE COMEÇAR A UTILIZAR O KNEX*/

