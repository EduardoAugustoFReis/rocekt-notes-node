const sqlite3 = require("sqlite3"); // importando o driver
const sqlite = require("sqlite"); // importando o banco de dados
const path = require("path");

async function sqliteConnection(){
  const database = await sqlite.open( {
    filename: path.resolve(__dirname, "..", "database.db"), // local onde o banco de dados ficará salvo
    driver: sqlite3.Database // conexão com o banco de dados
  })

  return database;
}
module.exports = sqliteConnection;