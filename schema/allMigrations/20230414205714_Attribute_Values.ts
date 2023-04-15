import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Attribute_Values", (table) => {
    table.increments("id").unsigned().primary();
    table.integer("attribute_id").unsigned().notNullable().references("id").inTable("Attributes").onDelete("CASCADE");
    table.string("attribute_value", 50).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Attribute_Values")
}

