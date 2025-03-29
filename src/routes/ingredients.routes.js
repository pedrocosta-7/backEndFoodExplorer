const {Router} = require("express");

const ingredientesRoutes = Router();

const IngredientsController = require("../controllers/ingredientsController")

const ingredientsController = new IngredientsController();

ingredientesRoutes.post("/:id", ingredientsController.create)

module.exports = ingredientesRoutes;