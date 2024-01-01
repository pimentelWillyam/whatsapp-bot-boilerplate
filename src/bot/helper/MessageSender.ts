import { type Whatsapp } from 'venom-bot'
import { type IMessageSender } from '../interface/IMessageSender'

class MessageSender implements IMessageSender {
  constructor (private readonly whatsappClient: Whatsapp) {}
  async send (recipient: string, content: string): Promise<void> {
    await this.whatsappClient.sendText(recipient, content)
  }
}

export { MessageSender }
