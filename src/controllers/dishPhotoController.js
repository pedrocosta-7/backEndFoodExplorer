const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError")

class DishPhotoController {
  async update(request, response) {
    const { id } = request.params; // ID do prato
    const photoFilename = request.file.filename; // pegando o arquivo dentro da requisição

    const diskStorage = new DiskStorage();

    const dish = await knex("dishs").where({ id }).first(); // busca o prato pelo id passado  no parametro

    if (!dish) {
      throw new AppError("Prato não encontrado");
    }

    // Se já existir uma foto, deletar antes
    if (dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    }

    const filename = await diskStorage.saveFile(photoFilename);
    dish.photo = filename;

    await knex("dishs").where({ id }).update({
      photo: filename,
    });

    return response.json({ photo: filename });
  }
}

module.exports = DishPhotoController
