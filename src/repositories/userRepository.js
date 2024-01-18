const sqliteConnection = require("../database/sqlite"); // importando a conexão com o banco de dados


class UserRepository{

  async findByEmail(email){

    const database = await sqliteConnection();
    const user = await database.get("select * from users where email = (?)", [email] );

    return user;
  }

  async create({name, email, password}){

    const database = await sqliteConnection();

    const userId = await database.run("insert into users (name, email, password) values (?,?,?)", [name, email, password] );

    return {id: userId};
  }

}

module.exports = UserRepository;