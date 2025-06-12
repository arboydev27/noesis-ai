import type { HttpContext } from '@adonisjs/core/http'
import ChatSession from '#models/chat_session'
import ChatMessage from '#models/chat_message'
import LLMService from '#services/llm_service'

export default class ChatSessionsController {
  
  // Display a list of chat sessions
  async index({ response }: HttpContext) {
    const sessions = await ChatSession.query()
      .preload('messages')
      .orderBy('created_at', 'desc')
    return response.ok(sessions)
  }

  // GET /chat-sessions
  // async index({ response }: HttpContext) {
  //   const sessions = await ChatSession.query()
  //     .preload('messages', (query) => {
  //       query.orderBy('created_at', 'asc') // ensure oldest message first
  //     })
  //     .orderBy('created_at', 'desc')

  //   const chatList = sessions.map((session) => {
  //     const firstUserMessage = session.messages.find((msg) => msg.role === 'user')
  //     return {
  //       id: session.id,
  //       prompt: firstUserMessage?.content || '(No prompt)',
  //       createdAt: session.createdAt.toISO(),
  //     }
  //   })

  //   return response.ok(chatList)
  // }


  // Display form to create a new record
  async create({}: HttpContext) {}

  // Create a new session and message
  async store({ request, response }: HttpContext) {
    const { userId, content } = request.only(['userId', 'content'])

    // 1. Creaye a session
    const session = await ChatSession.create({ userId })

    // 2. Save a user prompt
    await ChatMessage.create({
      sessionId: session.id,
      userId,
      role: 'user',
      content,
    })

    // 3. Get LLM response
    const aiResponse = await LLMService.generateResponse(content)

    // 4. Save assistant response
    const assistantMessage = await ChatMessage.create({
      sessionId: session.id,
      userId,
      role: 'assistant',
      content: aiResponse,
    })

    return response.created({ sessionId: session.id, reply: assistantMessage })
  }

  // Show full session
  async show({ params, response }: HttpContext) {
    const session = await ChatSession.query()
      .where('id', params.id)
      .preload('messages')
      .first()

    if (!session) return response.notFound({ message: 'Session not found' })
    return response.ok(session)
  }

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  // Append a message to an exsiting session
  async update({ params, request, response }: HttpContext) {
    const { userId, content } = request.only(['userId', 'content'])

    const session = await ChatSession.find(params.id)
    if (!session) return response.notFound({ message: 'Session not found' })

    // Save user prompt
    await ChatMessage.create({
      sessionId: session.id,
      userId,
      role: 'user',
      content,
    })

    // Get response from LLM
    const aiResponse = await LLMService.generateResponse(content)

    // Save assistant message
    const assistantMessage = await ChatMessage.create({
      sessionId: session.id,
      userId,
      role: 'assistant',
      content: aiResponse,
    })

    return response.ok({ sessionId: session.id, reply: assistantMessage })
  }

   // Delete session and its messages
  async destroy({ params, response }: HttpContext) {
    const session = await ChatSession.find(params.id)
    if (!session) return response.notFound({ message: 'Session not found' })
    await session.delete()
  return response.ok({ message: 'Session deleted successfully' })
  }
}