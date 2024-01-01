
import { type IBotFactory } from '../interface/IBotFactory'
import { Bot } from '../Bot'
import { MessageHandlerFactory } from './MessageListenerFactory'

class BotFactory implements IBotFactory {
  private readonly messageHandlerFactory = new MessageHandlerFactory()

  fabricate (): Bot {
    return new Bot(this.messageHandlerFactory.fabricate())
  }
}

export { Bot, BotFactory }
