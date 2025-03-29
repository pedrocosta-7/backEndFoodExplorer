const {Router} = require("express");

const routes = Router();

const usersRoutes = require("./users.routes")
const sessionsRoutes = require("./sessions.routes")
const dishsRoutes = require("./dishs.routes")
const ingredientesRoutes = require("./ingredients.routes")

routes.use("/users", usersRoutes)
routes.use("/session", sessionsRoutes)
routes.use("/dishs", dishsRoutes)
routes.use("/ingredients", ingredientesRoutes)

module.exports = routes;