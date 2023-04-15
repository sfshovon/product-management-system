import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Product_Attributes", (table) => {
    table.integer("product_id").unsigned().notNullable().references("id").inTable("Products").onDelete("CASCADE");
    table.integer("attribute_id").unsigned().notNullable().references("id").inTable("Attributes").onDelete("CASCADE");
    table.integer("attribute_value_id").unsigned().notNullable().references("id").inTable("Attribute_Values").onDelete("CASCADE");
    table.boolean("activation_status").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Product_Attributes")
}

