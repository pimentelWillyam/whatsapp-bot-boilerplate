import { type IMessageListener } from './IMessageListener'

interface IMessageListenerFactory {
  fabricate: () => IMessageListener
}

export type { IMessageListenerFactory }
