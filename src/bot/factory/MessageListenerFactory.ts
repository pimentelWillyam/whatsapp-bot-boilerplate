import { MessageListener } from '../helper/MessageListener'
import { type IMessageListener } from '../interface/IMessageListener'
import { type IMessageListenerFactory } from '../interface/IMessageHandlerFactory'

class MessageListenerFactory implements IMessageListenerFactory {
  fabricate (): IMessageListener {
    return new MessageListener()
  }
}

export { MessageListenerFactory }
