import type { AnalysisIssueItem } from '../types/analysisIssue';
import type { RegistryData } from '../types/registry';
import type { RiskLevel } from '../types/risk';
import {
  getRegistrySummaryItems,
  type RegistrySummaryItem,
} from './registrySummary';

export function getRegistryRiskLevel(registry: RegistryData): RiskLevel {
  if (registry.trustWarning || registry.priorLease) return 'danger';

  if (registry.ownershipChangeRecent || registry.mortgageCount > 0) {
    return 'caution';
  }

  return 'safe';
}

function mapRegistryItems(
  items: RegistrySummaryItem[],
  riskLevel: RiskLevel,
): AnalysisIssueItem[] {
  return items.map((item, index) => ({
    id: `${riskLevel}-${index}-${item.title}`,
    title: item.title,
    riskLevel,
    details: [
      { label: '설명', content: item.description },
      { label: '대응 방법', content: item.action },
    ],
  }));
}

export function getRegistryAnalysisIssues(
  registry: RegistryData,
): AnalysisIssueItem[] {
  const { dangerItems, cautionItems, safeItems } =
    getRegistrySummaryItems(registry);

  return [
    ...mapRegistryItems(dangerItems, 'danger'),
    ...mapRegistryItems(cautionItems, 'caution'),
    ...mapRegistryItems(safeItems, 'safe'),
  ];
}
