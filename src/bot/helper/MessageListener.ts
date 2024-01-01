import { type IMessageListener } from '../interface/IMessageListener'
import { type IMessageHandler } from '../interface/IMessageHandler'

import { type WhatsappClient } from '../type/WhatsappClient'

class MessageListener implements IMessageListener {
  constructor (private readonly whatsappClient: WhatsappClient, private readonly messageHandler: IMessageHandler) {}

  async start (): Promise<void> {
    await this.whatsappClient.onMessage((message) => {
      this.messageHandler.handle(message).then().catch((err) => { console.error(err) })
    })
  }

  async stop (): Promise<void> {
    await this.whatsappClient.close()
  }
}

export { MessageListener }
