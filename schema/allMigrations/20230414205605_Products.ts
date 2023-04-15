import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Products", (table) => {
    table.increments("id").unsigned().primary();
    table.string("product_name", 100).notNullable();
    table.text("product_details").notNullable();
    table.decimal('product_price', 4, 2).unsigned().notNullable();
    table.boolean("activation_status").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Products");
}

