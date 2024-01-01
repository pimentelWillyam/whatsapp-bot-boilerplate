import { type Bot } from '../factory/BotFactory'

interface IBotFactory {
  fabricate: (sessionName: string) => Promise<Bot>
}

export type { IBotFactory }
