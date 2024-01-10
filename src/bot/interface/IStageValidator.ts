import { type Stage } from '../entity/Stage'

interface IStageValidator {
  validate: (stage: Stage) => void
}

export type { IStageValidator }
