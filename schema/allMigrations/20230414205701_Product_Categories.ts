import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Product_Categories", (table) => {
    table.integer("product_id").unsigned().notNullable().references("id").inTable("Products").onDelete("CASCADE");
    table.integer("category_id").unsigned().notNullable().references("id").inTable("Categories").onDelete("CASCADE");
    table.boolean("activation_status").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Product_Categories")
}

