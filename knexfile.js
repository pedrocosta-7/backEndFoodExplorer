const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path");



module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault : true
  },
  
};

/* o KNEX SERVE PARA SE CONECTAR AO NOSSO BANCO DE DADOS ENTAO AQUI VAMOS DIZER ONDE NOSSO BANCO DE DADOS ESTA PARA QUE ELE POSSA SE CONECTAR COM ELE

   É AQUI TAMBEM QUE DIZEMOS ONDE VAMOS COLOCAR NOSSAS MIGRATIONS E AS MIGRATIONS SO VAO SE CONECTAR SE O CAMINHO DA CONEXÃO COM O BANCO DE DADOS ESTIVER CORRETA"
*/