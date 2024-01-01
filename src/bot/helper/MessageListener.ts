import type { Whatsapp, Message } from 'venom-bot'
import { type IMessageListener } from '../interface/IMessageListener'

class MessageListener implements IMessageListener {
  async listen (client: Whatsapp, message: Message): Promise<void> {
    console.log('received message')
    if (message.isGroupMsg) {
      await client.sendText(message.from, 'Olá, estou ligado e funcionando!')
    }
  }
}

export { MessageListener }
