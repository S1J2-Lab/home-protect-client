import type { AnalysisIssueItem } from '../types/analysis';
import type { ContractClause, ContractData } from '../types/contract';

function getContractIssueLabel(level: ContractClause['level']) {
  if (level === 'danger') return '주의 필요';
  return '확인 필요';
}

export function getContractAnalysisIssues(
  contract: ContractData,
): AnalysisIssueItem[] {
  const clauses = [...contract.toxicClauses, ...contract.cautionClauses];

  return clauses.map((clause, index) => ({
    id: `${clause.level}-${index}-${clause.title}`,
    title: clause.title,
    label: getContractIssueLabel(clause.level),
    variant: clause.level,
    details: [
      { label: '특약 원문', content: clause.originalText },
      { label: '법률 설명', content: clause.legalIssue },
      { label: '판례', content: clause.precedent },
      { label: '대응책', content: clause.suggestion },
    ],
  }));
}
