// export type IssueVariant = 'danger' | 'warning' | 'success';

export type IssueVariant = 'danger' | 'caution' | 'safe'; //백엔드 json 구조
export type IssueDirection = 'grid' | 'column';
export interface AnalysisIssueDetail {
  label: string;
  content: string;
}

export interface AnalysisIssueItem {
  id: string;
  title: string;
  label: string;
  variant: IssueVariant;
  details: AnalysisIssueDetail[];
}

export type BuildingLevel = 'danger' | 'caution' | 'safe';

export interface BuildingData {
  level: BuildingLevel;
  primaryUse: string;
  isResidential: boolean;
  violation: boolean;
  approvedDate: string;
  redevelopmentZone: boolean;
}
