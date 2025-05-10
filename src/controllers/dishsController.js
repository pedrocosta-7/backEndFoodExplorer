const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");

class DishsController {
  async create(request, response) {
    const { name, ingredients, price, description, categoria } = request.body;
    const user_id = request.user.id;

    if (!name || !ingredients || !price || !description) {
      throw new AppError("preencha todos os campos");
    }

    const [dish_Id] = await knex("dishs").insert({
      name,
      price,
      description,
      user_id,
      categoria
    }); /*aqui ele sempre retorna o elemento que é autoincrmente */

    const insertIngredients = ingredients.map((name) => {
      return {
        dish_Id,
        name,
      };
    });

    await knex("ingredients").insert(insertIngredients);

    return response.json({ id: dish_Id,  name, ingredients, price, description });
  }
  async delete(request, response) {
    const { id } = request.params;

    await knex("dishs").where({ id }).delete();

    return response.json({});
  }
  async update(request, response) {
    const { name, ingredients, price, description, categoria } = request.body;
    const user_id = request.user.id;
    const { id } = request.params;

    await knex("dishs")
      .where({ id })
      .update({ name, price, description, user_id, categoria });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_Id: id,
        name,
      };
    });

    await knex("ingredients").where({ dish_Id: id }).del();
    await knex("ingredients").insert(ingredientsInsert);

    return response.json({});
  }
  async index(request, response) {
    const { title, ingrediente } = request.query;

    let dishs;

    if (ingrediente) {
      const filterIngrediente = ingrediente.split(",");

      dishs = await knex("dishs")
        .select([
          "dishs.photo",
          "dishs.name",
          "dishs.description",
          "dishs.price",
          "dishs.description"
          
        ])
        .innerJoin("ingredients", "ingredients.dish_Id","dishs.id")
        .whereIn("ingredients.name", filterIngrediente);
    } else if (title) {
      dishs = await knex("dishs").whereLike("name", `%${title}%`);

    } else {
      dishs = await knex("dishs");
    }

    const ingredients = await knex("ingredients")

    const result = dishs.map(dish => {
      const dishWithIngredients = ingredients.filter(ingredient => ingredient.dish_Id === dish.id);
      return {
        ...dish,
        ingredients: dishWithIngredients
      };
    });

    return response.json(result)

   

    

  }
  async show(request, response) {
    const { id } = request.params;
    const { title, ingrediente } = request.query;

    const dish = await knex("dishs").where({ id }).first();

    const ingredients = await knex("ingredients").where({ dish_Id: id });

    return response.json({
      ...dish,
      ingredients,
    });
  }
}

module.exports = DishsController;
