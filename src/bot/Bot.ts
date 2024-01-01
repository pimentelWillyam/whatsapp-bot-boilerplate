import { type IBot } from './interface/IBot'

import { type IMessageListener } from './interface/IMessageListener'

class Bot implements IBot {
  constructor (private readonly messageListener: IMessageListener) {}

  async start (): Promise<void> {
    void this.messageListener.start()
  }

  async stop (): Promise<void> {
    void this.messageListener.stop()
  }
}

export { Bot }
