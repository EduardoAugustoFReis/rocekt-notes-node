const path = require("path");

module.exports = {

  development: {
    client: 'sqlite3', // tipo de banco de dados
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") // onde está o arquivo de banco de dados
    },
    pool:{
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations:{
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true 
  }

};
