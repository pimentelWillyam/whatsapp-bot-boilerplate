import { type WhatsappClient } from '../type/WhatsappClient'
import { type IMessageHandler } from './IMessageHandler'

interface IMessageHandlerFactory {
  fabricate: (client: WhatsappClient) => IMessageHandler
}

export type { IMessageHandlerFactory }
