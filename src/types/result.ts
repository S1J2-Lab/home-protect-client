export type IssueDirection = 'grid' | 'column';

import type { TagVariant } from '../constants/tag';

export interface AnalysisIssueDetail {
  label: string;
  content: string;
}

export interface AnalysisIssueItem {
  id: string;
  title: string;
  label: string;
  variant: TagVariant;
  details: AnalysisIssueDetail[];
}

export interface BuildingData {
  level: TagVariant;
  primaryUse: string;
  isResidential: boolean;
  violation: boolean;
  approvedDate: string;
  redevelopmentZone: boolean;
}
