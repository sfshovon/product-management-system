import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Attributes", (table) => {
    table.increments("id").unsigned().primary();
    table.string("attribute_name", 50).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Attributes")
}

