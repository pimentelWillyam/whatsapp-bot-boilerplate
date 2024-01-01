import { type IMessageSender } from './IMessageSender'

interface IMessageSenderFactory {
  fabricate: (client: WhatsappClient) => IMessageSender
}

export type { IMessageSenderFactory }
