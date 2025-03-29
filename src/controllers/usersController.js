const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {hash, compare} = require("bcryptjs")
const bcrypt = require("bcryptjs")

class UsersController {
    async create(request, response){
        const {name, email, password} = request.body;

        if(!name || !email || !password) {
        throw new AppError("preencha todos os campos")
        }

        const checkEmailExists = await knex("users").where({email}).first()

        if(checkEmailExists) {
            throw new AppError("este email já está cadastrado")
        }

        const hashedpassword = await bcrypt.hash(password, 8)

        await knex("users").insert({name, email, password:hashedpassword})

        return response.json({name, email})
    }
}

module.exports = UsersController;