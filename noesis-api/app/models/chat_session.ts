import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ChatMessage from '#models/chat_message'

export default class ChatSession extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @hasMany(() => ChatMessage)
  // declare messages: HasMany<typeof ChatMessage>

  @hasMany(() => ChatMessage, {
    foreignKey: 'sessionId', // 👈 tell Adonis what the foreign key really is
  })
  declare messages: HasMany<typeof ChatMessage>
}