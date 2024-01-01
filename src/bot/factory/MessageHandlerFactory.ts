import { MessageHandler } from '../helper/MessageHandler'
import { type IMessageHandler } from '../interface/IMessageHandler'
import { type IMessageHandlerFactory } from '../interface/IMessageHandlerFactory'
import { type WhatsappClient } from '../type/WhatsappClient'

class MessageHandlerFactory implements IMessageHandlerFactory {
  fabricate (whatsappClient: WhatsappClient): IMessageHandler {
    return new MessageHandler(whatsappClient)
  }
}

export { MessageHandlerFactory }
