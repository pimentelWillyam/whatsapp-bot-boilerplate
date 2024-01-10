import type Person from '../entity/Person'

interface IPersonService {
  create: (name: string, email: string, age: number) => Promise<Person>
  getAll: () => Promise<Person[]>
  get: (id: string) => Promise<Person | null>
  update: (id: string, personToBeUpdated: Person) => Promise<Person | null>
  delete: (id: string) => Promise<Person | null>

}

export default IPersonService
