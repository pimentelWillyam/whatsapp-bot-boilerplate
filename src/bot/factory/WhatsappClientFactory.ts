
import { create } from 'venom-bot'
import { type IWhatsappClientFactory } from '../interface/IWhatsappClientFactory'
import { type WhatsappClient } from '../type/WhatsappClient'

class WhatsappClientFactory implements IWhatsappClientFactory {
  async fabricate (sessionName: string): Promise<WhatsappClient> {
    return await create({ session: sessionName })
  }
}

export { WhatsappClientFactory }
