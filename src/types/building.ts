import type { TagVariant } from '../constants/tag';

export interface BuildingData {
  level: TagVariant;
  primaryUse: string;
  isResidential: boolean;
  violation: boolean;
  approvedDate: string;
  redevelopmentZone: boolean;
}

export interface BuildingInfoItem {
  label: string;
  value: string;
}
