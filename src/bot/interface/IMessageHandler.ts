import type { Message } from 'venom-bot'

interface IMessageHandler {
  handle: (message: Message) => Promise<void>
}

export type { IMessageHandler }
