
interface IMessageListener {

  start: () => Promise<void>
  stop: () => Promise<void>
}

export type { IMessageListener }
