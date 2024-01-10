import { type Stage } from '../entity/Stage'
import { type IStageController } from '../interface/IStageController'
import { type StageName } from '../type/StageName'

class StageController implements IStageController {

  constructor(stageValidator: IStageValidator)

  async create (stage: Stage): Promise<Stage> {

  }

  async fetch (stageName: StageName): Promise<Stage | null> {

  }
}

export { StageController }
