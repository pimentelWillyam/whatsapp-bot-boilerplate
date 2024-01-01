import { type Bot } from '../factory/BotFactory'
import { type IMessageHandler } from './IMessageListener'

interface IBotFactory {
  fabricate: (messageHandler: IMessageHandler) => Bot
}

export type { IBotFactory }
