import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
      await knex.raw(`
    CREATE TRIGGER category_deactivate AFTER UPDATE ON categories
    FOR EACH ROW
    BEGIN
      IF NOT NEW.activation_status AND OLD.activation_status THEN
        UPDATE products SET activation_status = 0 WHERE id IN (
          SELECT DISTINCT product_id FROM product_categories WHERE category_id = OLD.id
        );
      END IF;
    END;
`);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    DROP TRIGGER IF EXISTS category_deactivate_trigger;
  `);
}

