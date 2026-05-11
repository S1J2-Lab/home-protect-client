import type { AnalysisIssueItem } from '../types/analysisIssue';
import type { ContractData } from '../types/contract';

export function getContractAnalysisIssues(
  contract: ContractData,
): AnalysisIssueItem[] {
  const clauses = [...contract.toxicClauses, ...contract.cautionClauses];

  return clauses.map((clause, index) => ({
    id: `${clause.level}-${index}-${clause.title}`,
    title: clause.title,
    riskLevel: clause.level,
    details: [
      { label: '특약 원문', content: clause.originalText },
      { label: '법률 설명', content: clause.legalIssue },
      { label: '판례', content: clause.precedent },
      { label: '대응책', content: clause.suggestion },
    ],
  }));
}
