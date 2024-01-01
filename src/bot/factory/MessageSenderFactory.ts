import { MessageSender } from '../helper/MessageSender'
import { type IMessageSender } from '../interface/IMessageSender'
import { type IMessageSenderFactory } from '../interface/IMessageSenderFactory'
import { type WhatsappClient } from '../type/WhatsappClient'

class MessageSenderFactory implements IMessageSenderFactory {
  fabricate (whatsappClient: WhatsappClient): IMessageSender {
    return new MessageSender(whatsappClient)
  }
}

export { MessageSenderFactory }
