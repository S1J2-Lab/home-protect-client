import type { AnalysisIssueItem } from '../types/analysis';
import { getRegistrySummaryItems, type RegistryData } from './registrySummary';

export function getRegistryAnalysisIssues(
  registry: RegistryData,
): AnalysisIssueItem[] {
  const { dangerItems, cautionItems, safeItems } =
    getRegistrySummaryItems(registry);

  return [
    ...dangerItems.map((item) => ({
      id: `danger-${item.title}`,
      title: item.title,
      label: '주의 필요',
      variant: 'danger' as const,
      details: [
        { label: '쉬운 설명', content: item.description },
        { label: '대응책', content: item.action },
      ],
    })),
    ...cautionItems.map((item) => ({
      id: `caution-${item.title}`,
      title: item.title,
      label: '확인 필요',
      variant: 'caution' as const,
      details: [
        { label: '쉬운 설명', content: item.description },
        { label: '대응책', content: item.action },
      ],
    })),
    ...safeItems.map((item) => ({
      id: `safe-${item.title}`,
      title: item.title,
      label: '정상',
      variant: 'safe' as const,
      details: [
        { label: '쉬운 설명', content: item.description },
        { label: '대응책', content: item.action },
      ],
    })),
  ];
}
