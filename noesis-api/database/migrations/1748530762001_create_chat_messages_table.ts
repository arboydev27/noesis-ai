import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'chat_messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('session_id')
        .unsigned()
        .references('id')
        .inTable('chat_sessions')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('user_id').notNullable()
      table.enum('role', ['user', 'assistant']).notNullable
      table.text('content').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}