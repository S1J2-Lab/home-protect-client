import type { RiskLevel } from './risk';
export interface ContractClause {
  level: RiskLevel;
  title: string;
  originalText: string;
  legalIssue: string;
  precedent: string;
  suggestion: string;
}

export interface ContractData {
  toxicClauses: ContractClause[];
  cautionClauses: ContractClause[];
}
