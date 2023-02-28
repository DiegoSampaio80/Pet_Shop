/* const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pet-shop'
});

console.log('Conexão com o banco de dados realizada com sucesso');

module.exports = connection; */

const mysql = require('mysql2');

// configuração do banco de dados
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'pet-shop'
});
module.exports = connection; 