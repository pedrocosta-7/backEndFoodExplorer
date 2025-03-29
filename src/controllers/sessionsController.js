const knex = require("../database/knex/index")
const AppError = require("../utils/AppError")
const bcrypt = require("bcryptjs")
const {hash, compare} = require("bcryptjs")
const {sign} = require("jsonwebtoken")
const authConfig = require("../configs/auth")


class SessionsController {
async create(request, response){
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first()

    if(!user){
        throw new AppError("email ou senha incorretos")
    } 
    
    const hashedCompare = await bcrypt.compare(password, user.password);

    if(!hashedCompare){
        throw new AppError("email ou senha incorretos")
    }

    const {secret, expiresIn} = authConfig.jwt;
    /*aqui ele ta somente desestruturando do objeto que foi criado no arquivo de congig/auth.js*/

    const token = sign({}, secret, {
        subject: String(user.id), /* essa linha serve para inserir o user.id dentro token */ 
        expiresIn
    }) /* nessa parte do codigo, esta gerando um token a partir do metodo sign importado jsonwebtoken que é gerado a partir de 3 argumentos,
    o primeiro sempre nulo, o segundo que é a senha e o terceiro que sao as options geralmente inserindo o user.id e a expiração!*/ 

    /* Muito importante entender que o token é gerado quando o usuario faz a seção, que a partir que o usuario fez a seçao ele vai ter 
    acesso ao restante da aplicação, isso serve para o usuario se desloga automaticament edepois de um tempo, é ai que entra o expiresIn*/ 

    

    return response.json({user, token})
}
}

module.exports = SessionsController;