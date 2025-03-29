exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id"),
    table.integer("dish_Id").references("id").inTable("dishs"),
    table.text("name")
})


exports.down = knex => knex.schema.dropTable("ingredients")