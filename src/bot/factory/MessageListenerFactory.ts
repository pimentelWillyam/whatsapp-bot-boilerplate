import { MessageListener } from '../helper/MessageListener'
import { type IMessageListener } from '../interface/IMessageListener'
import { type IMessageListenerFactory } from '../interface/IMessageListenerFactory'
import { type WhatsappClient } from '../type/WhatsappClient'
import { MessageHandlerFactory } from './MessageHandlerFactory'

class MessageListenerFactory implements IMessageListenerFactory {
  private readonly messageHandlerFactory = new MessageHandlerFactory()

  fabricate (whatsappClient: WhatsappClient): IMessageListener {
    return new MessageListener(whatsappClient, this.messageHandlerFactory.fabricate(whatsappClient))
  }
}

export { MessageListenerFactory }
