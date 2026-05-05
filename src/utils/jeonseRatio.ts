import type { TagVariant } from '../constants/tag';

export function getRiskLevelLabel(riskLevel: TagVariant) {
  if (riskLevel === 'danger') return '주의';
  if (riskLevel === 'caution') return '확인';
  return '정상';
}

export function getRatioNotice(ratio: number) {
  if (ratio <= 75) {
    return '전세가율이 안정적인 수준이에요.';
  }

  if (ratio <= 85) {
    return '전세가율이 다소 높은 편이에요. 시세와 보증보험 가능 여부를 확인해 주세요.';
  }

  return '전세가율이 매우 높아 깡통전세 위험이 있습니다. 계약 전 반드시 추가 확인이 필요해요.';
}

export function formatPrice(price: number) {
  return `${price.toLocaleString()}원`;
}
