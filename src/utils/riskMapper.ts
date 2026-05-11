import type { TagVariant } from '../constants/tag';
import type { RiskLevel } from '../types/risk';

export function toTagVariant(level: RiskLevel): TagVariant {
  return level;
}

export function getRiskLevelLabel(level: RiskLevel) {
  if (level === 'danger') return '주의';
  if (level === 'caution') return '확인';
  return '정상';
}
