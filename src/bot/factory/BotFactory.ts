
import { type IBotFactory } from '../interface/IBotFactory'
import { Bot } from '../Bot'
import { MessageListenerFactory } from './MessageListenerFactory'
import { WhatsappClientFactory } from './WhatsappClientFactory'
class BotFactory implements IBotFactory {
  private readonly messageListenerFactory = new MessageListenerFactory()
  private readonly whatsappClientFactory = new WhatsappClientFactory()

  async fabricate (sessionName: string): Promise<Bot> {
    return new Bot(this.messageListenerFactory.fabricate(await this.whatsappClientFactory.fabricate(sessionName)))
  }
}

export { Bot, BotFactory }
