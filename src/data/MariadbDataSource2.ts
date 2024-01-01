import config from '../config'

import * as mariadb from 'mariadb'
import type { Connection, Pool } from 'mariadb'
import { type Servant } from '../factories/ServantFactory'
import { type Battle } from '../factories/BattleFactory'
import type DatabaseServant from '../api/model/DatabaseServant'

class MariadbDataSource2 {
  private connection: Connection | undefined
  private pool: Pool | undefined

  async bootstrap (): Promise<boolean> {
    await this.openConnectionPool()
    this.createNecessaryDatabases().finally(() => {
      this.createNecessaryTables().finally(() => {

      })
    })
    return true
  }

  async startConnection (): Promise<boolean> {
    this.connection = await mariadb.createConnection({ host: config.mariadb.host, user: config.mariadb.username, password: config.mariadb.password })
    return true
  }

  async stopConnection (): Promise<boolean> {
    if (this.connection === undefined) {
      return false
    }
    await this.connection.end()
    return true
  }

  async openConnectionPool (): Promise<boolean> {
    this.pool = mariadb.createPool({ host: config.mariadb.host, user: config.mariadb.username, password: config.mariadb.password })
    return true
  }

  async closeConnectionPool (): Promise<boolean> {
    if (this.pool === undefined) {
      return false
    }
    await this.pool.end()
    return true
  }

  async createNecessaryDatabases (): Promise<boolean> {
    if (!await this.motionBladeDatabaseExists()) {
      await this.createMotionBladeDatabase().finally()
    }
    return true
  }

  async createMotionBladeDatabase (): Promise<boolean> {
    await this.pool?.query('CREATE DATABASE motion_blade_2 ;')
    return true
  }

  async useMotionBladeDatabase (): Promise<boolean> {
    await this.pool?.query('USE motion_blade_2 ;')
    return true
  }

  async motionBladeDatabaseExists (): Promise<boolean> {
    const databaseList = await this.pool?.query("SHOW DATABASES LIKE 'motion_blade_2' ;")
    if (databaseList.length === 0) {
      return false
    }
    return true
  }

  async createServantTable (): Promise<boolean> {
    await this.pool?.query('USE motion_blade_2 ;').finally(() => {
      const query2 = "CREATE TABLE `servant` (`id` UUID NOT NULL, `master_id` VARCHAR(50) NOT NULL DEFAULT '', `name` VARCHAR(50) NOT NULL DEFAULT '', `father_profession` VARCHAR(50) NOT NULL DEFAULT '', `youth_profession` VARCHAR(50) NOT NULL DEFAULT '', `current_attributes` JSON NOT NULL, `maximum_attributes` JSON NOT NULL, `combat_capabilities` JSON NOT NULL, `battle_info` JSON NOT NULL, `inventory` JSON NOT NULL, `maestry` JSON NOT NULL)COLLATE='latin1_swedish_ci';"

      this.pool?.query(query2).finally(() => { console.log('tabela de servos criada') })
    })
    // const query2 = "CREATE TABLE `servant` (`id` UUID NOT NULL, `master_id` VARCHAR(50) NOT NULL DEFAULT '', `name` VARCHAR(50) NOT NULL DEFAULT '', `father_profession` VARCHAR(50) NOT NULL DEFAULT '', `youth_profession` VARCHAR(50) NOT NULL DEFAULT '', `current_attributes` JSON NOT NULL, `maximum_attributes` JSON NOT NULL, `combat_capabilities` JSON NOT NULL, `battle_info` JSON NOT NULL, `inventory` JSON NOT NULL, `maestry` JSON NOT NULL)COLLATE='latin1_swedish_ci';"
    // await this.pool?.query(query2)

    return true
  }

  async createBattleTable (): Promise<boolean> {
    await this.pool?.query('USE motion_blade_2 ;').finally(() => {
      const query = "CREATE TABLE `battle` (`id` UUID NOT NULL, `name` VARCHAR(50) NOT NULL DEFAULT '', `participants_list` JSON NOT NULL, `turn_info` JSON NULL, `map` JSON NOT NULL)COLLATE='latin1_swedish_ci';"
      this.pool?.query(query).finally(() => { console.log('tabela de batalhas criada') })
    })

    return true
  }

  async tableExists (tableName: string): Promise<boolean> {
    const res = await this.pool?.query("SHOW TABLES FROM motion_blade_2 LIKE '" + tableName + "' ;")
    if (res[0] == null) {
      return false
    }
    return true
  }

  async createNecessaryTables (): Promise<boolean> {
    if (!await this.tableExists('servant')) await this.createServantTable()
    if (!await this.tableExists('battle')) await this.createBattleTable()
    return true
  }

  async insertServantRegistry (servant: Servant): Promise<Servant> {
    const query = 'INSERT INTO motion_blade_2.servant (id, master_id, name, father_profession, youth_profession, current_attributes, maximum_attributes, combat_capabilities, battle_info, inventory, maestry) VALUES (?,?,?,?,?,?,?,?,?,?,?);'
    await this.pool?.query(query, [servant.id, servant.masterId, servant.name, servant.fatherProfession, servant.youthProfession, servant.currentAttributes, servant.maximumAttributes, servant.combatCapabilities, servant.battleInfo, servant.inventory, servant.maestry])
    return servant
  }

  async insertBattleRegistry (battle: Battle): Promise<Battle> {
    console.log('batalha:', battle)
    const query = 'INSERT INTO motion_blade_2.battle (id, name, map) VALUES (?,?,?);'
    await this.pool?.query(query, [battle.id, battle.name, battle.map])
    return battle
  }

  async fetchEveryServantRegistry (): Promise<Servant[]> {
    const databaseData = await this.pool?.query('SELECT * FROM motion_blade_2.servant ;') as DatabaseServant[]
    const servantList: Servant[] = []
    databaseData.forEach((servant) => {
      servantList.push({
        id: servant.id,
        masterId: servant.master_id,
        name: servant.name,
        fatherProfession: servant.father_profession,
        youthProfession: servant.youth_profession,
        currentAttributes: servant.current_attributes,
        maximumAttributes: servant.maximum_attributes,
        combatCapabilities: servant.combat_capabilities,
        battleInfo: servant.battle_info,
        inventory: servant.inventory,
        maestry: servant.maestry

      })
    })
    return servantList
  }

  async fetchEveryBattleRegistry (): Promise<Battle[]> {
    return await this.pool?.query('SELECT * FROM motion_blade_2.battle ;') as Battle[]
  }

  async fetchServantBy (parameter: string, parameterValue: string): Promise<Servant | null> {
    const databaseData = await this.pool?.query(`SELECT * FROM motion_blade_2.servant WHERE ${parameter} = '${parameterValue}' ;`) as DatabaseServant[]
    if (databaseData[0] === undefined) return null
    else {
      return {
        id: databaseData[0].id,
        masterId: databaseData[0].master_id,
        name: databaseData[0].name,
        fatherProfession: databaseData[0].father_profession,
        youthProfession: databaseData[0].youth_profession,
        currentAttributes: databaseData[0].current_attributes,
        maximumAttributes: databaseData[0].maximum_attributes,
        combatCapabilities: databaseData[0].combat_capabilities,
        battleInfo: databaseData[0].battle_info,
        inventory: databaseData[0].inventory,
        maestry: databaseData[0].maestry

      }
    }
  }

  async fetchBattleBy (parameter: string, parameterValue: string): Promise<Battle | null> {
    const battleList = await this.pool?.query(`SELECT * FROM motion_blade_2.battle WHERE ${parameter} = '${parameterValue}' ;`)
    if (battleList[0] === undefined) return null
    else return battleList[0] as Battle
  }

  async updateServantBy (parameter: string, parameterValue: string, servantToUpdate: Servant): Promise<Servant> {
    const query = `UPDATE motion_blade_2.servant SET id=?,masterId=?,name=?,fatherProfession=?,youthProfession=?,currentAttributes=?,maximumAttributes=?,guard=?,buff=?,debuff=?,inventory=?,maestry=? WHERE ${parameter} = '${parameterValue}'`

    await this.pool?.query(query, [servantToUpdate.id, servantToUpdate.masterId, servantToUpdate.name, servantToUpdate.fatherProfession, servantToUpdate.youthProfession, servantToUpdate.currentAttributes, servantToUpdate.maximumAttributes, servantToUpdate.combatCapabilities, servantToUpdate.battleInfo, servantToUpdate.inventory, servantToUpdate.maestry])

    return servantToUpdate
  }

  async updateBattleBy (parameter: string, parameterValue: string, battleToUpdate: Battle): Promise<Battle> {
    const query = `UPDATE motion_blade_2.battle SET id=?,name=?,participants_list=?,turn_info=?,map=? WHERE ${parameter} = '${parameterValue}'`

    await this.pool?.query(query, [battleToUpdate.id, battleToUpdate.name, battleToUpdate.participantsList, battleToUpdate.turnInfo, battleToUpdate.map])

    return battleToUpdate
  }

  async deleteServantBy (parameter: string, parameterValue: string): Promise<Servant | null> {
    const servant = await this.fetchServantBy(parameter, parameterValue)
    if (servant === null) return null
    const query = `DELETE FROM motion_blade_2.servant WHERE ${parameter} = '${parameterValue}';`
    await this.pool?.query(query, [servant.id, servant.masterId, servant.name, servant.fatherProfession, servant.youthProfession, servant.currentAttributes, servant.maximumAttributes, servant.combatCapabilities, servant.battleInfo, servant.inventory, servant.maestry])
    return servant
  }

  async deleteBattleBy (parameter: string, parameterValue: string): Promise<Battle | null> {
    const servant = await this.fetchBattleBy(parameter, parameterValue)
    if (servant === null) return null
    const query = `DELETE FROM motion_blade_2.servant WHERE ${parameter} = '${parameterValue}';`
    await this.pool?.query(query)
    return servant
  }
}

export default MariadbDataSource2
