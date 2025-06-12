/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ChatSessionsController from '#controllers/chat_sessions_controller'
import ChatMessagesController from '#controllers/chat_messages_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// router.resource('chats',ChatsController).apiOnly()
router.resource('chat-messages', ChatMessagesController).apiOnly()
router.resource('chat-sessions', ChatSessionsController).apiOnly()
