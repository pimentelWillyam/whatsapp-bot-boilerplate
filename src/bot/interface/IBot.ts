interface IBot {
  start: () => Promise<void>
  stop: () => Promise<void>
}

export type { IBot }
