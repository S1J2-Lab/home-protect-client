export type AnalysisStepId =
  | 'jeonseRatio'
  | 'registryParse'
  | 'contractReview'
  | 'buildingCheck';

export type AnalysisStepStatus = 'pending' | 'loading' | 'done';

export interface AnalysisStep {
  id: AnalysisStepId;
  title: string;
  description: string;
  status: AnalysisStepStatus;
}

export type AnalysisPageStatus = 'loading' | 'error';
