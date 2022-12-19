import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('food')
      table.string('drink')
      table.float('price')
      table.string('phone')
      table.string('postal_code')
      table.string('country')
      table.string('card_number')
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
