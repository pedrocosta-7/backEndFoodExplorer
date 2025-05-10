const {Router} = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const DishPhotoController = require("../controllers/dishPhotoController")
const DishsController = require("../controllers/dishsController")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const upload = multer(uploadConfig.MULTER)

const dishsRoutes = Router();


const dishsController = new DishsController();
const dishPhotoController = new DishPhotoController();

dishsRoutes.post("/",ensureAuthenticated, dishsController.create)
dishsRoutes.delete("/:id",ensureAuthenticated, dishsController.delete)
dishsRoutes.put("/:id", ensureAuthenticated, dishsController.update)
dishsRoutes.get("/", ensureAuthenticated, dishsController.index)
dishsRoutes.get("/:id", ensureAuthenticated, dishsController.show)
dishsRoutes.patch("/photo/:id", ensureAuthenticated, upload.single("photo"), dishPhotoController.update)

module.exports = dishsRoutes;


