export type IssueVariant = 'danger' | 'caution' | 'safe';
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
