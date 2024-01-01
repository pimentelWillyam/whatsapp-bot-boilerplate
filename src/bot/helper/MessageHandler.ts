import { type Message } from 'venom-bot'
import { type IMessageHandler } from '../interface/IMessageHandler'
import { type WhatsappClient } from '../type/WhatsappClient'

class MessageHandler implements IMessageHandler {
  constructor (private readonly whatsappClient: WhatsappClient) {}
  async handle (message: Message): Promise<void> {
    // get number of message sender
    // checks if number exists in the database
    // if number exists then send the answer to the the option he selected and then update his info
    // else registers the user in the database and sends the first stage message
  }
}

export { MessageHandler }
