interface IMessageSender {
  send: (recipient: string, content: string) => Promise<void>
}

export type { IMessageSender }
