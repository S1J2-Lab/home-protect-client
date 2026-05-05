import type { BuildingData } from '../types/analysis';

interface BuildingInfoItem {
  id: string;
  text: string;
  danger?: boolean;
}

export function getBuildingInfoItems(
  building: BuildingData,
): BuildingInfoItem[] {
  const infoItems: BuildingInfoItem[] = [
    {
      id: 'primary-use',
      text: building.isResidential
        ? `주거용 건물 (${building.primaryUse})`
        : `주거용 건물이 아니에요 (${building.primaryUse})`,
      danger: !building.isResidential,
    },
    {
      id: 'violation',
      text: building.violation ? '위반건축물로 확인됨' : '위반건축물 없음',
      danger: building.violation,
    },
    {
      id: 'approved-date',
      text: `사용승인일: ${formatDate(building.approvedDate)}`,
    },
  ];

  if (building.redevelopmentZone) {
    infoItems.push({
      id: 'redevelopment-zone',
      text: '재개발 예정 구역이에요',
      danger: true,
    });
  }

  return infoItems;
}

function formatDate(date: string) {
  return date.replaceAll('-', '.');
}
