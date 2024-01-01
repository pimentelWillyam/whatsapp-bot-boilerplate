import { type WhatsappClient } from '../type/WhatsappClient'

interface IWhatsappClientFactory {
  fabricate: (sessionName: string) => Promise<WhatsappClient>
}

export type { IWhatsappClientFactory }
