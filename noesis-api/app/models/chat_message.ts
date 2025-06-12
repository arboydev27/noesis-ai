import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ChatSession from '#models/chat_session'

export default class ChatMessage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() 
  declare sessionId: number

  @column()
  declare userId: number

  @column()
  declare role:'user' | 'assistant'

  @column() 
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @belongsTo(() => ChatSession)
  // declare session: BelongsTo<typeof ChatSession>
  @belongsTo(() => ChatSession, {
    foreignKey: 'sessionId',
  })
  declare session: BelongsTo<typeof ChatSession>

}