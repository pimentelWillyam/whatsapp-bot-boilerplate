import { type StageName } from '../type/StageName'

class Stage implements IStage {
  constructor (readonly name: StageName, readonly message: string, readonly fatherName: string, readonly childrenName: string[]) {}
}

export { Stage }
