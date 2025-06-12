// import type { HttpContext } from '@adonisjs/core/http'
// import Chat from '#models/chat'
// import LLMService from '#services/llm_service'

// export default class ChatsController {
//   /**
//    * Display a list of resource
//    */
//   async index({ response }: HttpContext) {
//     const chats = await Chat.all()
//     return response.ok(chats)
//   }

//   /**
//    * Display form to create a new record
//    */
//   // async create({}: HttpContext) {}

//   /**
//    * Handle form submission for the create action
//    * POST /chats => Create a new chat
//     */
  
//   //With LLM use to generate full response (non-streaming) and saves to DB => For storing entire chat history
//   async store({ request, response }: HttpContext) {
//     const { userId, prompt } = request.only(['userId', 'prompt'])

//     try {
//       // Call Local LLaMA model
//       const aiResponse = await LLMService.generateResponse(prompt)

//       if (!aiResponse) {
//         return response.badRequest({ message: 'Failed to generate response' })
//       }

//       // Store in database
//       const chat = await Chat.create({
//         userId,
//         prompt,
//         response: aiResponse,
//       })
//       return response.created(chat)
//     } catch (error) {
//       console.error('LLM or DB error:', error)
//       return response.internalServerError({ message: 'Failed to generate response' })
//     }
//   }

//   /**
//    * Show individual record
//    * GET /chats/:id => Show a single chat
//    */
//   async show({ params, response }: HttpContext) {
//     const chat = await Chat.find(params.id)

//     if (!chat) {
//       return response.notFound({ message: 'Chat not found' })
//     }

//     return response.ok(chat)
//     }

//   // /**
//   //  * Edit individual record
//   //  */
//   // async edit({ params }: HttpContext) {}

//   /**
//    * Handle form submission for the edit action
//    * PUT /chats/:id => Update a chat
//    */
//   async update({ params, request, response }: HttpContext) {
//     const chat = await Chat.find(params.id)

//     if (!chat) {
//       return response.notFound({ message: 'Chat not found' })
//     }

//     const data = request.only(['prompt', 'response'])

//     chat.merge(data)
//     await chat.save()

//     return response.ok(chat)
//   }

//   /**
//    * Delete record
//    * DELETE /chats/:id => Delete a chat
//    * 
//    */
//   async destroy({ params, response }: HttpContext) {
//     const chat = await Chat.find(params.id)

//     if (!chat) {
//       return response.notFound({ message: 'Chat not found' })
//     }

//     await chat.delete()

//     return response.ok({ message: 'Chat deleted successfully' })
//   }
// }