const knex = require("../database/knex");
const AppError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");

class userAvatarController{

  async update(request, response){
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;// pegar o nome do arquivo que o avatar fez o upload

    const diskStorage = new DiskStorage();

    const user = await knex("users").where( {id : user_id} ).first();

    if(!user){
      throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
    }

    if(user.avatar){
      await diskStorage.deleteFile(user.avatar); // deletar a foto antiga
    }

    const filename = await diskStorage.saveFile(avatarFilename); // pegar a imagem nova
    user.avatar = filename // substituir a imagem antiga pela nova

    await knex("users").update(user).where( {id: user_id});

    return response.json(user);
  }  

}

module.exports = userAvatarController