import { type Stage } from '../entity/Stage'
import { type StageName } from '../type/StageName'

interface IStageController {
  create: () => Promise<Stage>
  fetch: (stageName: StageName) => Promise<Stage | null>
}

export type { IStageController }
