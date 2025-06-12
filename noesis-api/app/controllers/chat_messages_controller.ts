import type { HttpContext } from '@adonisjs/core/http'
import ChatSession from '#models/chat_session'
import ChatMessage from '#models/chat_message'
import LLMService from '#services/llm_service'
import { buildPromptWithHistory } from '#services/build_prompt'




export default class ChatMessagesController {
  // GET /chat-sessions/:sessionId/messages => Fetch all messages in one session
  async index({ params, response}: HttpContext) {
    const messages = await ChatMessage
      .query()
      .where('session_id', params.sessionId)
      .orderBy('created_at', 'asc')

    return response.ok(messages)
  }

   // Display form to create a new record
   // async create({}: HttpContext) {}


  // POST /chat-messages => Add a new user message and get assistant reply
  async store({ request, response }: HttpContext) {
    const { sessionId, userId, content } = request.only(['sessionId', 'userId', 'content'])

    // Make sure the session exists
    const session = await ChatSession.find(sessionId)
    if (!session) return response.notFound({ message: 'Session not found' })

      // Save user message
      const userMessage = await ChatMessage.create({
        sessionId,
        userId,
        role: 'user',
        content,
      })

      // Build full prompt including history
      const fullPrompt = await buildPromptWithHistory(sessionId, content)

      // Call the LLM with user prompt
      const assistantResponse = await LLMService.generateResponse(fullPrompt)

      // Save assistant message
      const assistantMessage = await ChatMessage.create({
        sessionId,
        userId,
        role: 'assistant',
        content: assistantResponse,
      })

      return response.created({
        userMessage,
        assistantMessage,
      })
  }

  // GET /chat-messages/:id => (optional) fetch one message
  async show({ params, response }: HttpContext) {
    const message = await ChatMessage.find(params.id)
    if (!message) return response.notFound({ message: 'Message not found' })

    return response.ok(message)
  }

  // Edit individual record
  // async edit({ params }: HttpContext) {}

  
  // Handle form submission for the edit action
  // async update({ params, request }: HttpContext) {}

  
  // DELETE /chat-messages/:id
  async destroy({ params, response }: HttpContext) {
    const message = await ChatMessage.find(params.id)
    if (!message) return response.notFound({ message: 'Message not found' })

    await message.delete()
    return response.ok({ message: 'Message deleted successfully' })
  }
}