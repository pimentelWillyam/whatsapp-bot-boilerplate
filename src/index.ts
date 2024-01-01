import { BotFactory } from './bot/factory/BotFactory'
import { DataSourceFactory } from './api/factory/DataSourceFactory'
import { APIFactory } from './api/factory/APIFactory'

const main = async (): Promise<void> => {
  const bot = await new BotFactory().fabricate('session-name')
  const dataSource = new DataSourceFactory().fabricate('memory')
  const api = new APIFactory(dataSource).fabricate()

  await bot.start()
  dataSource.start()
  api.start(4000)
}

void main()
