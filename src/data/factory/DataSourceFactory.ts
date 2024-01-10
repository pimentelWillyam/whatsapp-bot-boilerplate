import MariadbDataSource from '../MariadbDataSource'
import MemoryDataSource from '../MemoryDataSource'
import { type IDataSourceFactory } from '../../api/interface/IDataSourceFactory'
import { type DataSourceType } from '../type/DataSourceType'
import { dataSourceConfig } from '../dataSourceConfig'
import { type DataSource } from '../type/Datasource'

class DataSourceFactory implements IDataSourceFactory {
  fabricate (dataSourceType: DataSourceType): DataSource {
    switch (dataSourceType) {
      case 'memory':
        return new MemoryDataSource()

      case 'mariadb':
        return new MariadbDataSource(dataSourceConfig.mariadb.host, dataSourceConfig.mariadb.port, dataSourceConfig.mariadb.userName, dataSourceConfig.mariadb.password, dataSourceConfig.mariadb.connectionLimit)
      default:
        throw new Error('Error during data source creation')
    }
  }
}

export { DataSourceFactory }
