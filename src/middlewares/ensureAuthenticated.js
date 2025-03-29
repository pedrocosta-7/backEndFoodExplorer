const AppError = require("../utils/AppError")
const {verify}= require("jsonwebtoken")
const authConfig = require("../configs/auth")

 function ensureAuthenticated(request, response, next){

    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT não informado", 401)
    }

    const [, token] = authHeader.split(" ")

    try{
        const {sub: user_id} = verify(token, authConfig.jwt.secret);

        request.user = { id: Number(user_id) };

        return next();
    } catch {
        throw new AppError("o token informado não está correto", 401)
    }

}

module.exports = ensureAuthenticated