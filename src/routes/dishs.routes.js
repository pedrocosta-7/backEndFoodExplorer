const {Router} = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const upload = multer(uploadConfig.MULTER)

const dishsRoutes = Router();

const DishsController = require("../controllers/dishsController")

const dishsController = new DishsController();

dishsRoutes.post("/",ensureAuthenticated, dishsController.create)
dishsRoutes.delete("/:id",ensureAuthenticated, dishsController.delete)
dishsRoutes.put("/:id", ensureAuthenticated, dishsController.update)
dishsRoutes.get("/", ensureAuthenticated, dishsController.index)
dishsRoutes.get("/:id", ensureAuthenticated, dishsController.show)
dishsRoutes.patch("/photo", ensureAuthenticated, upload.single("photo"), (request, response)=>{
    console.log("deu certo!")
    console.log(request.file)
    response.json({})
})

module.exports = dishsRoutes;


