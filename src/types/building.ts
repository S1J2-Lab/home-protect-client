export interface BuildingData {
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
