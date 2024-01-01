import { type WhatsappClient } from '../type/WhatsappClient'
import { type IMessageListener } from './IMessageListener'

interface IMessageListenerFactory {
  fabricate: (client: WhatsappClient) => IMessageListener
}

export type { IMessageListenerFactory }
