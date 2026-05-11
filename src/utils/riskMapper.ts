import type { TagVariant } from '../constants/tag';
import type { RiskLevel } from '../types/risk';

export function toTagVariant(level: RiskLevel | null): TagVariant {
  return level ?? 'primary';
}

export function getRiskLevelLabel(level: RiskLevel | null) {
  if (level === 'danger') return '주의';
  if (level === 'caution') return '확인';
  if (level === 'safe') return '정상';
  return '정보 없음';
}
