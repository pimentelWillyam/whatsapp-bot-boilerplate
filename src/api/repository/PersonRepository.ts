import type IPersonRepository from '../interface/IPersonRepository'
import type Person from '../entity/Person'
import { type DataSource } from '../../data/type/Datasource'

class PersonRepository implements IPersonRepository {
  constructor (readonly dataSource: DataSource) {}

  async create (id: string, name: string, email: string, age: number): Promise<Person> {
    await this.dataSource.insertPersonRegistry({ id, name, email, age })
    return { id, name, email, age }
  }

  async getAll (): Promise<Person[]> {
    return await this.dataSource.fetchEveryPersonRegistry()
  }

  async get (id: string): Promise<Person | null> {
    return await this.dataSource.fetchPersonBy('id', id)
  }

  async update (id: string, name: string, email: string, age: number): Promise<Person | null> {
    return await this.dataSource.updatePersonBy('id', id, { id, name, email, age })
  }

  async delete (id: string): Promise<Person | null> {
    return await this.dataSource.deletePersonBy('id', id)
  }
}

export default PersonRepository
