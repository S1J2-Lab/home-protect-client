export type AnalysisStepStatus = 'done' | 'loading' | 'pending';

export type AnalysisPageStatus = 'loading' | 'error' | 'done';

export type AnalysisErrorCode =
  | 'API_UNAVAILABLE'
  | 'ANALYSIS_TIMEOUT'
  | 'INVALID_ADDRESS'
  | 'AI_PARSE_FAILED'
  | 'NETWORK_ERROR';

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: AnalysisStepStatus;
}
