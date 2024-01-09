const AppError = require("../utils/appError");

const sqliteConnection = require("../database/sqlite"); // importando a conexão com o banco de dados

const { hash, compare } = require("bcryptjs"); // hash é a função para criptografar senhas

class UserController{
  
  async create(request, response){
    const {name, email, password} = request.body;

    const database = await sqliteConnection();

    const checkUserExist = await database.get("select * from users where email = (?)", [email] );
    
    if(checkUserExist){
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8);

    await database.run("insert into users (name, email, password) values (?,?,?)", [name, email, hashedPassword] );

    return response.status(201).json();
  }

  async update(request, response){
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();

    const user = await database.get("select * from users where id = (?)", [user_id] );

    if(!user){
      throw new AppError("Usuário não encontrado.");
    }

    const checkEmail = await database.get("select * from users where email = (?)", [email] );

    if( checkEmail && checkEmail.id !== user.id){
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name; // nullish operator
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para atualizar a nova.");
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
      throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      update users set
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      where id = ?`, [user.name, user.email, user.password , user_id] );

    return response.status(200).json();  
}

}

module.exports = UserController;

// métodos do controller 
// index - get 
// show - get 
// create - post 
// update - put 
// delete - delete 