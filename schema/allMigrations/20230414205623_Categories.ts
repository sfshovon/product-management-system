import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Categories", (table) => {
    table.increments("id").unsigned().primary();
    table.string("category_name", 50).notNullable();
    table.boolean("activation_status").notNullable().defaultTo(true);
    table.integer("root_id").unsigned().references("id").inTable("Categories").onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Categories")
}

