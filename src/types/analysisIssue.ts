import type { RiskLevel } from './risk';

export interface AnalysisIssueDetail {
  label: string;
  content: string;
}

export interface AnalysisIssueItem {
  id: string;
  title: string;
  riskLevel: RiskLevel;
  details: AnalysisIssueDetail[];
}
