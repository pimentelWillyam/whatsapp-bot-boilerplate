import { BotFactory } from './bot/factory/BotFactory'
import { DataSourceFactory } from './api/factory/DataSourceFactory'
import { APIFactory } from './api/factory/APIFactory'

const bot = new BotFactory().fabricate()
const dataSource = new DataSourceFactory().fabricate('memory')
const api = new APIFactory(dataSource).fabricate()

void bot.start()
dataSource.start()
api.start(4000)
