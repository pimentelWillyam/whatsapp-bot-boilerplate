import { type IBot } from './interface/IBot'

import { create, type Whatsapp } from 'venom-bot'
import { type IMessageListener } from './interface/IMessageListener'

class Bot implements IBot {
  private client: Whatsapp | undefined
  constructor (private readonly messageListener: IMessageListener) {}

  private async bootstrap (): Promise<void> {
    create({ session: 'whatsapp-bot ' }).then((whatsappClient) => {
      this.client = whatsappClient
      void this.start()
    }).catch((error) => { console.error(error) })
  }

  async start (): Promise<void> {
    await this.bootstrap()
    if (this.client === undefined) throw new Error('Client is undefined')
    await this.client.onMessage((message) => {
      void this.messageListener.listen(this.client as Whatsapp, message)
    })
  }

  async stop (): Promise<void> {
    if (this.client === undefined) throw new Error('Error with client connection')
    await this.client.close()
  }
}

export { Bot }
