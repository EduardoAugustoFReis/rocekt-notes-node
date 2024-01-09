const { verify } = require("jsonwebtoken");
const AppError = require("../utils/appError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){

  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try{
    const {sub: user_id }= verify(token, authConfig.jwt.secret); // verifica se é um token válido e se o secret bate, sub é um resultado da função verify 

    request.user ={
      id: Number(user_id) 
    }

    return next();
  }catch{
    throw new AppError("JWT token inválido", 401);
  }

}

module.exports = ensureAuthenticated;
