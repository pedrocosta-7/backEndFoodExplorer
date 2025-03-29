exports.up = knex => knex.schema.createTable("dishs", table => {
    table.string('photo').nullable(),
    table.increments("id"),
    table.integer("user_id").unsigned().references("id").inTable("users"), 
    table.text("name"),
    table.text("price"),
    table.text("description"),
    table.timestamp("created_at").default(knex.fn.now()),
    table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("dishs");