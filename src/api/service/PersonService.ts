import { type NameNormalizer } from '../helper/NameNormalizer'
import type UUIDGenerator from '../helper/UUIDGenerator'
import type Person from '../entity/Person'
import type IPersonRepository from '../interface/IPersonRepository'
import type IPersonService from '../interface/IPersonService'

class PersonService implements IPersonService {
  constructor (readonly PersonRepository: IPersonRepository, readonly idGenerator: UUIDGenerator, readonly fullNameNormalizer: NameNormalizer) {}

  async create (name: string, email: string, age: number): Promise<Person> {
    return await this.PersonRepository.create(this.idGenerator.generate(), this.fullNameNormalizer.normalize(name), email, age)
  }

  async getAll (): Promise<Person[]> {
    return await this.PersonRepository.getAll()
  }

  async get (id: string): Promise<Person | null> {
    return await this.PersonRepository.get(id)
  }

  async update (id: string, personToBeUpdated: Person): Promise<Person | null> {
    return await this.PersonRepository.update(id, this.fullNameNormalizer.normalize(personToBeUpdated.name), personToBeUpdated.email, personToBeUpdated.age)
  }

  async delete (id: string): Promise<Person | null> {
    return await this.PersonRepository.delete(id)
  }
}

export default PersonService
