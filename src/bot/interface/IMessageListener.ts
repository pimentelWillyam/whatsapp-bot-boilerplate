import type { Whatsapp, Message } from 'venom-bot'

interface IMessageListener {
  listen: (client: Whatsapp, message: Message) => Promise<void>
}

export type { IMessageListener }
