const knex = require("../database/knex/index")


class IngredientsController {
    async create(request, response){
    const {name} = request.body;
    const{dish_id} = request.params;

   

    await knex("ingredients").insert({name, dish_id})

    response.json({name})
    }
}

module.exports = IngredientsController;